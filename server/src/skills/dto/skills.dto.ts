import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class SkillsDto {
    @IsString()
    @IsNotEmpty()
    readonly category!: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true }) // Ensures every element in the array is a string
    readonly skills!: string[];
}
