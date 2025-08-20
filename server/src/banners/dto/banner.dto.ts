import { IsString, IsNotEmpty } from 'class-validator';

export class BannerDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  readonly image?: string;

}
