import {
    Body,
    Controller,
    Delete,
    Put,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    UseInterceptors,
    UploadedFile
  } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './schemas/experience.schema';
import { ExperienceDto } from './dto/experience.dto';
import { handleSuccess } from '../utils/util';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join  } from 'path';
import { existsSync, unlinkSync } from 'fs';

  @Controller('experience')
  export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}

    // Fetch all experiences
    @Get()
    @HttpCode(HttpStatus.OK)
    async getExperiences(): Promise<Experience[]> {
      return this.experienceService.findAll();
    }

    // Fetch a specific experience by ID
    @Get(':id')
    async getExperienceById(@Param('id') id: string): Promise<Experience> {
      const experience = await this.experienceService.findById(id);
      if (!experience) {
        throw new NotFoundException(`Experience with ID ${id} not found`);
      }
      return experience;
    }

    @Post()
    @UseInterceptors(FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          if (!file) {
            return callback(new Error('File is missing'), "");
          }
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }))
    async create(
      @Body() experienceDto: ExperienceDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new Error('File upload failed. No file received.');
      }
      const logoUrl = `/uploads/${file.filename}`;
      return this.experienceService.createExperience({ ...experienceDto, logo: logoUrl });
    }

    // Delete an experience entry by ID
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
      const deletedExperience = await this.experienceService.deleteExperience(id);
      if (!deletedExperience) {
        throw new NotFoundException(`Experience with ID ${id} not found`);
      }
      return handleSuccess({ data: deletedExperience, message: 'Experience deleted successfully' });
    }
  }
