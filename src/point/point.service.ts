import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from '../model/point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(@InjectRepository(Point) private readonly repo: Repository<Point>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async getById(id: number){
    return await this.repo.findOne(id);
  }

  public async create(point: Point){
    return await this.repo.save(point);
  }

  public async updateById(id: number, point: Point){
    return await this.repo.update(id, point);
  }

  public async deleteById(id: number){
    return await this.repo.delete(id);
  }

}