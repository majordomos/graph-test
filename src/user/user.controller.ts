import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  public async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string){
    return await this.userService.getById(id);
  }

  // @Post()
  // public async create(@Body() user: User){
  //   return await this.serv.create(user);
  // }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() user: User){
    return await this.userService.updateById(id, user);
  }

  // @Delete(':id')
  // public async delete(@Param('id') id: string){
  //   return await this.serv.deleteById(Number(id));
  // }

  @Get('gmail/:email')
  public async getByEmail(@Param('email') email: string){
    return await this.userService.getByEmail(email);
  }
}