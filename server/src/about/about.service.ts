import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { About } from './schemas/about.schema';
import { AboutDto } from './dto/about.dto';
import { handleError } from '../utils/util';

@Injectable()
export class AboutService {
    constructor(@InjectModel(About.name) private readonly aboutModel: Model<About>) {}

    async findAll(): Promise<About[]> {
        return this.aboutModel.find().exec();
    }

    async findById(id: string): Promise<About | null> {
        return this.aboutModel.findById(id).exec();
    }

    private about = [];
    async createAbout(createAboutDto: AboutDto): Promise<About> {
        const newAbout = new this.aboutModel(createAboutDto);
        return newAbout.save();
    }

    async deleteAbout(id: string): Promise<About | null> {
        try {
          const inputId = new mongoose.Types.ObjectId(id);
          const about = await this.aboutModel.findByIdAndDelete(inputId);
          if (!about) {
            throw new NotFoundException('about not found');
          }
          return about;
        } catch (e) {
          handleError(e);
          return null;
        }
      }


    async updateAbout(id: string, updateAboutDto: AboutDto): Promise<About> {
        const updatedAbout = await this.aboutModel.findByIdAndUpdate(id, updateAboutDto, { new: true });

        if (!updatedAbout) {
            throw new NotFoundException(`About entry with ID ${id} not found`);
        }

        return updatedAbout;
    }

}



