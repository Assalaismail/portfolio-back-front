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
  } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skills } from './schemas/skills.schema';
import { SkillsDto } from './dto/skills.dto';
import { handleSuccess } from '../utils/util';
import { FileInterceptor } from '@nestjs/platform-express';


  @Controller('skills')
  export class SkillsController {
    constructor(private readonly skillsService: SkillsService) {}

    // Fetch all skills
    @Get()
    @HttpCode(HttpStatus.OK)
    async getSkills(): Promise<Skills[]> {
      return this.skillsService.findAll();
    }

    // Fetch a specific skill by ID
    @Get(':id')
    async getSkillById(@Param('id') id: string): Promise<Skills> {
      const skill = await this.skillsService.findById(id);
      if (!skill) {
        throw new NotFoundException(`Skill with ID ${id} not found`);
      }
      return skill;
    }

    // Create a new skill category
    @Post()
    @UseInterceptors(FileInterceptor('file')) // Add this to handle form-data
    async create(@Body() createSkillsDto: SkillsDto): Promise<Skills> {
      return this.skillsService.createSkill(createSkillsDto);
    }

    // Update an existing skill category
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
      @Param('id') id: string,
      @Body() updateSkillsDto: SkillsDto
    ): Promise<Skills> {
      return this.skillsService.updateSkill(id, updateSkillsDto);
    }

    // Delete a skill category by ID
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
      const deletedSkill = await this.skillsService.deleteSkill(id);
      return handleSuccess({ data: deletedSkill, message: 'Skill deleted successfully' });
    }
  }
