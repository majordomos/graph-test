import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Point } from '../model/point.entity';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private serv: PointService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string){
    return await this.serv.getById(Number(id));
  }

  @Post()
  public async create(@Body() point: Point){
    return await this.serv.create(point);
  }

  // @Put(':id')
  // public async update(@Param('id') id: string, @Body() point: Point){
  //   return await this.serv.updateById(Number(id), point);
  // }

  // @Delete(':id')
  // public async delete(@Param('id') id: string){
  //   return await this.serv.deleteById(Number(id));
  // }
}