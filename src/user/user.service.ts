import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async getById(id: number){
    return await this.repo.findOne(id);
  }

  public async create(User: User){
    return await this.repo.save(User);
  }

  public async updateById(id: number, User: User){
    return await this.repo.update(id, User);
  }

  public async deleteById(id: number){
    return await this.repo.delete(id);
  }

  public async getByEmail(email: string){
    return await this.repo.findOne({email});
  }

}