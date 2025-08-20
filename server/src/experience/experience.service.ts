import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Experience } from './schemas/experience.schema';
import { ExperienceDto } from './dto/experience.dto';
import { handleError } from '../utils/util';

@Injectable()
export class ExperienceService {
    constructor(@InjectModel(Experience.name) private readonly experienceModel: Model<Experience>) {}

    async findAll(): Promise<Experience[]> {
        return this.experienceModel.find().exec();
    }

    async findById(id: string): Promise<Experience | null> {
        return this.experienceModel.findById(id).exec();
    }

    private experience = [];
    async createExperience(createExperienceDto: ExperienceDto): Promise<Experience> {
        const newExperience = new this.experienceModel(createExperienceDto);
        return newExperience.save();
    }

    async deleteExperience(id: string): Promise<Experience | null> {
        try {
          const inputId = new mongoose.Types.ObjectId(id);
          const experience = await this.experienceModel.findByIdAndDelete(inputId);
          if (!experience) {
            throw new NotFoundException('experience not found');
          }
          return experience;
        } catch (e) {
          handleError(e);
          return null;
        }
      }


    async updateExperience(id: string, updateExperienceDto: ExperienceDto): Promise<Experience> {
        const updatedExperience = await this.experienceModel.findByIdAndUpdate(id, updateExperienceDto, { new: true });

        if (!updatedExperience) {
            throw new NotFoundException(`experience entry with ID ${id} not found`);
        }

        return updatedExperience;
    }

}



