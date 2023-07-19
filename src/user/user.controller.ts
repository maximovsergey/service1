import { User, UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userServica: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userServica.getAllUsers();
  }
  @Get(':id')
  async getOne(@Param('id') id): Promise<User> {
    return await this.userServica.getOne(id);
  }
  @Post()
  async create(@Body('name') name): Promise<User | Error> {
    return await this.userServica.create(name);
  }
  @Put()
  async update(@Body() data: User): Promise<User | Error> {
    return await this.userServica.update(data);
  }
  @Delete(':id')
  async delete(@Param('id') id): Promise<boolean> {
    return await this.userServica.delete(id);
  }
}
