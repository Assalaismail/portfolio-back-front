import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skills, SkillsSchema } from './schemas/skills.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Skills.name, schema: SkillsSchema }])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService,  MongooseModule],
})
export class SkillsModule {}
