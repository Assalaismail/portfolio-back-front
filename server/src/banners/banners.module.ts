import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { Banner, BannerSchema } from './schemas/banners.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }])],
  controllers: [BannersController],
  providers: [BannersService],
  exports: [BannersService,  MongooseModule],
})
export class BannersModule {}
