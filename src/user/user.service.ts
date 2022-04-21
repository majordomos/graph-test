import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { 
  }

  public async getAll() {
    return await this.userRepository.find();
  }

  public async getById(id: string){
    return await this.userRepository.findOne(id);
  }

  public async create(createUserDto: CreateUserDto){
    return await this.userRepository.save(createUserDto);
  }

  public async updateById(id: string, User: User){
    return await this.userRepository.update(id, User);
  }

  public async deleteById(id: string){
    return await this.userRepository.delete(id);
  }

  public async getByEmail(email: string){
    return await this.userRepository.findOne({email});
  }

}