import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { handleSuccess } from '../utils/util';
import { AuthGuard } from '../guards/auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
//   @UseGuards(AuthGuard) //Applying the guard
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Add this to handle form-data
  async create(@Body() createUserDto: UserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string) {
    const client = await this.usersService.deleteUser(id);
    return handleSuccess({ data: client, message: "success" });
  }
}
