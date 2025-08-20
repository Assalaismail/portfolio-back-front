import { IsString, IsNotEmpty } from 'class-validator';

export class AboutDto {
  @IsString()
  @IsNotEmpty()
  readonly description!: string;
}
