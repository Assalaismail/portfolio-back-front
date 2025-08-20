import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Skills } from './schemas/skills.schema';
import { SkillsDto } from './dto/skills.dto';
import { handleError } from '../utils/util';

@Injectable()
export class SkillsService {
    constructor(@InjectModel(Skills.name) private readonly SkillsModel: Model<Skills>) {}

    async findAll(): Promise<Skills[]> {
        return this.SkillsModel.find().exec();
    }

    async findById(id: string): Promise<Skills | null> {
        return this.SkillsModel.findById(id).exec();
    }

    private Skills = [];
    async createSkill(createSkillsDto: SkillsDto): Promise<Skills> {
        const newSkills = new this.SkillsModel(createSkillsDto);
        return newSkills.save();
    }

    async deleteSkill(id: string): Promise<Skills | null> {
        try {
          const inputId = new mongoose.Types.ObjectId(id);
          const Skills = await this.SkillsModel.findByIdAndDelete(inputId);
          if (!Skills) {
            throw new NotFoundException('Skills not found');
          }
          return Skills;
        } catch (e) {
          handleError(e);
          return null;
        }
      }


    async updateSkill(id: string, updateSkillsDto: SkillsDto): Promise<Skills> {
        const updatedSkills = await this.SkillsModel.findByIdAndUpdate(id, updateSkillsDto, { new: true });

        if (!updatedSkills) {
            throw new NotFoundException(`Skills entry with ID ${id} not found`);
        }

        return updatedSkills;
    }

}



