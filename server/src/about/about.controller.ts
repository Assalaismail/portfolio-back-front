import { Body, Controller, Delete, Put, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from './schemas/about.schema';
import { AboutDto } from './dto/about.dto';
import { handleSuccess } from '../utils/util';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
//   @UseGuards(AuthGuard) //Applying the guard
  @HttpCode(HttpStatus.OK)
  async getAbout(): Promise<About[]> {
    return this.aboutService.findAll();
  }

  @Get(":id")
  async getAboutById(@Param('id') id: string) {
    const about = await this.aboutService.findById(id);
    if (!about) {
      throw new NotFoundException(`about with ID ${id} not found`);
    }
    return about;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Add this to handle form-data
  async create(@Body() createAboutDto: AboutDto) {
    return this.aboutService.createAbout(createAboutDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string) {
    const client = await this.aboutService.deleteAbout(id);
    return handleSuccess({ data: client, message: "success" });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file')) // Handles file uploads
  async update(
    @Param('id') id: string,
    @Body() updateAboutDto: AboutDto
    ) {
  return this.aboutService.updateAbout(id, updateAboutDto);
}

}


