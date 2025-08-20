import { Body, Controller, Delete, Put, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannersService } from './banners.service';
import { Banner } from './schemas/banners.schema';
import { BannerDto } from './dto/banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { handleSuccess } from '../utils/util';
import { AuthGuard } from '../guards/auth.guard';
import { multerOptions } from '../config/multer.config';
import { diskStorage } from 'multer';
import { extname, join  } from 'path';
import { existsSync, unlinkSync } from 'fs';


@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
//   @UseGuards(AuthGuard) //Applying the guard
  @HttpCode(HttpStatus.OK)
  async getBanners(): Promise<Banner[]> {
    return this.bannersService.findAll();
  }

  @Get(":id")
  async getBannerById(@Param('id') id: string) {
    const banner = await this.bannersService.findById(id);
    if (!banner) {
      throw new NotFoundException(`banner with ID ${id} not found`);
    }
    return banner;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(
    @Body() createBannerDto: BannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log('Uploaded File:', file);

    if (!file) {
      throw new Error('File is required');
    }

    const imageUrl = `/uploads/${file.filename}`;
    return this.bannersService.createBanner({ ...createBannerDto, image: imageUrl });
  }

  ////////////////////////////////////

  /////////////////////////////////////

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string) {
    const client = await this.bannersService.deleteBanner(id);
    return handleSuccess({ data: client, message: "success" });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateBanner(
    @Param('id') id: string,
    @Body() updateBannerDto: Partial<BannerDto>,
    @UploadedFile() file?: Express.Multer.File, // Optional file
  ) {
    // Find the existing banner
    const existingBanner = await this.bannersService.findById(id);
    if (!existingBanner) {
      throw new Error('Banner not found');
    }

    let imageUrl = existingBanner.image; // Keep old image if no new one is uploaded

    // If a new image is uploaded, update the image field
    if (file) {
      imageUrl = `/uploads/${file.filename}`;

      // Delete the old image file (optional)
      const oldImagePath = join(__dirname, '..', existingBanner.image);
      if (existsSync(oldImagePath)) {
        unlinkSync(oldImagePath);
      }
    }

    // Update banner in the database
    return this.bannersService.updateBanner(id, { ...updateBannerDto, image: imageUrl });
  }

}


