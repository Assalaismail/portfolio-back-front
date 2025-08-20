import { Body, Controller, Delete, Get, Put, HttpCode, HttpStatus, NotFoundException, Param, Post, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';
import { Project } from './schemas/projects.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join  } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { handleSuccess } from '../utils/util';




@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

@Get(":id")
async getById(@Param('id') id: string) {
  const project = await this.projectsService.findById(id);
  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }
  return project;
}

@Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './projects-images',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(
    @Body() createProjectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) {
      throw new Error('File is required');
    }

    const imageUrl = `/projects-images/${file.filename}`;
    return this.projectsService.createProject({ ...createProjectDto, image: imageUrl });
  }


   @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param("id") id: string) {
      const client = await this.projectsService.deleteProject(id);
      return handleSuccess({ data: client, message: "success" });
    }


      // Update an existing skill category
    @Put(':id')
    @UseInterceptors(
         FileInterceptor('image', {
           storage: diskStorage({
             destination: './projects-images',
             filename: (req, file, callback) => {
               const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
               callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
             },
           }),
         }),
       )
    async updateProject(
         @Param('id') id: string,
         @Body() updateProjectDto: Partial<ProjectDto>,
         @UploadedFile() file?: Express.Multer.File,
       ) {
         // Find the existing project
         const existingProject = await this.projectsService.findById(id);
         if (!existingProject) {
           throw new Error('Project not found');
         }

         let imageUrl = existingProject.image;

         // If a new image is uploaded, update the image field
         if (file) {
           imageUrl = `/projects-images/${file.filename}`;

           // Delete the old image file
           const oldImagePath = join(__dirname, '..', existingProject.image);
           if (existsSync(oldImagePath)) {
             unlinkSync(oldImagePath);
           }
         }

         return this.projectsService.updateProject(id, { ...updateProjectDto, image: imageUrl });
       }
}
