import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { 
  }

  async getAll(): Promise<User[]>{
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User>{
    return await this.userRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User>{
    return await this.userRepository.save(createUserDto);
  }

  //  async create(user: User){
  //   return await this.userRepository.save(user);
  // }

  async updateById(id: string, User: User){
    return await this.userRepository.update(id, User);
  }

  //  async deleteById(id: string){
  //   return await this.userRepository.delete(id);
  // }

  async getByEmail(email: string): Promise<User>{
    return await this.userRepository.findOne({email});
  }

}