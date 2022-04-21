import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Point } from './point.entity';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private pointService: PointService) { }

  @Get()
  public async getAll() {
    return await this.pointService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string){
    return await this.pointService.getById(Number(id));
  }

  @Post()
  public async create(@Body() point: Point){
    return await this.pointService.create(point);
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