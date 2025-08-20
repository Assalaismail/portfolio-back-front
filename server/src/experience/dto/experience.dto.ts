import { IsString, IsNotEmpty, IsOptional, IsDateString, ValidateIf, Matches } from 'class-validator';


export class ExperienceDto {
    @IsOptional()
    @IsString()
    readonly logo?: string;

    @IsString()
    @IsNotEmpty()
    readonly company_name!: string;

    @IsString()
    @IsNotEmpty()
    readonly position!: string;

    @IsString()
    @IsNotEmpty()
    readonly start_date!: string;

    @IsString()
    @IsNotEmpty()
    readonly end_date!: string;
}
