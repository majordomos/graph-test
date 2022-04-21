import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(@InjectRepository(Point) private readonly pointRepository: Repository<Point>) { }

  public async getAll() {
    return await this.pointRepository.find();
  }

  public async getById(id: number){
    return await this.pointRepository.findOne(id);
  }

  public async create(point: Point){
    return await this.pointRepository.save(point);
  }

  public async updateById(id: number, point: Point){
    return await this.pointRepository.update(id, point);
  }

  public async deleteById(id: number){
    return await this.pointRepository.delete(id);
  }

}