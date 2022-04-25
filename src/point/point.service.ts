import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(@InjectRepository(Point) private readonly pointRepository: Repository<Point>) { }

  async getAll(): Promise<Point[]> {
    return await this.pointRepository.find();
  }

  async getById(id: number): Promise<Point>{
    return await this.pointRepository.findOne(id);
  }

  async create(point: Point): Promise<Point>{
    return await this.pointRepository.save(point);
  }

  // async updateById(id: number, point: Point): Promise<Point>{
  //   return await this.pointRepository.update(id, point);
  // }

  // async deleteById(id: number){
  //   return await this.pointRepository.delete(id);
  // }

}