import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { handleError } from '../utils/util';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    //for login
    async findOne(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async createUser(createUserDto: UserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async deleteUser(id: string): Promise<User | null> {
        try {
          const inputId = new mongoose.Types.ObjectId(id);
          const user = await this.userModel.findByIdAndDelete(inputId);
          if (!user) {
            throw new NotFoundException('user not found');
          }
          return user;
        } catch (e) {
          handleError(e);
          return null;
        }
      }
}

