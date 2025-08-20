import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName!: string;

  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsBoolean()
  readonly isAdmin!: boolean;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
