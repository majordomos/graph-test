import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Point } from './point.entity';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private pointService: PointService) { }

  @Get()
  public async getAll(): Promise<Point[]> {
    return await this.pointService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Point>{
    return await this.pointService.getById(Number(id));
  }

  @Post()
  public async create(@Body() point: Point): Promise<Point>{
    return await this.pointService.create(point);
  }
}