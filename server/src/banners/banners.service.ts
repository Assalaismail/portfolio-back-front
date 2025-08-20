import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Banner } from './schemas/banners.schema';
import { BannerDto } from './dto/banner.dto';
import { handleError } from '../utils/util';

@Injectable()
export class BannersService {
    constructor(@InjectModel(Banner.name) private readonly bannerModel: Model<Banner>) {}

    async findAll(): Promise<Banner[]> {
        return this.bannerModel.find().exec();
    }

    async findById(id: string): Promise<Banner | null> {
        return this.bannerModel.findById(id).exec();
    }

    private banners = [];
    async createBanner(createBannerDto: BannerDto): Promise<Banner> {
        const newBanner = new this.bannerModel(createBannerDto);
        return newBanner.save();
    }

    async deleteBanner(id: string): Promise<Banner | null> {
        try {
          const inputId = new mongoose.Types.ObjectId(id);
          const banner = await this.bannerModel.findByIdAndDelete(inputId);
          if (!banner) {
            throw new NotFoundException('Banner not found');
          }
          return banner;
        } catch (e) {
          handleError(e);
          return null;
        }
      }

      async updateBanner(id: string, updateData: Partial<Banner>): Promise<Banner | null> {
        return this.bannerModel.findByIdAndUpdate(id, updateData, { new: true });
      }
}



