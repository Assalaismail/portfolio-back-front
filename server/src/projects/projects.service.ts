import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Project } from './schemas/projects.schema';
import { ProjectDto } from './dto/project.dto';
import { handleError } from '../utils/util';



@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async createProject(createProject: ProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProject);
    return newProject.save();
  }

  async findAll(): Promise<Project[]> {
      return this.projectModel.find().exec();
    }

  async findById(id: string): Promise<Project | null> {
      return this.projectModel.findById(id).exec();
  }

  async deleteProject(id: string): Promise<Project | null> {
          try {
            const inputId = new mongoose.Types.ObjectId(id);
            const project = await this.projectModel.findByIdAndDelete(inputId);
            if (!project) {
              throw new NotFoundException('Project not found');
            }
            return project;
          } catch (e) {
            handleError(e);
            return null;
          }
    }

     async updateProject(id: string, updateData: Partial<Project>): Promise<Project | null> {
        return this.projectModel.findByIdAndUpdate(id, updateData, { new: true });
      }

}

