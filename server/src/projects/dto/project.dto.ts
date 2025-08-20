// src/projects/dto/project.dto.ts
import { IsString, IsNotEmpty, IsUrl, IsArray, ArrayNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  readonly image?: string;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsUrl()
  readonly website_url!: string;

   @IsArray()
   @ArrayNotEmpty()
   @IsString({ each: true })
  readonly frameworks!: string[];
}
