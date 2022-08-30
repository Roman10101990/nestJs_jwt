import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id: id}}) ;
  }

  async createNewUser(newUser: UserDto): Promise<User> {
    console.log('user', newUser);
    return this.usersRepository.save(newUser);
  }

  async updateNewUser(id: number, newUser: UserDto): Promise<User> {
    const user = await this.usersRepository.findOne({where: {id: id}});
    Object.assign(user, newUser);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const deletedUser = await this.usersRepository.findOne({where: {id: id}});
    return this.usersRepository.remove(deletedUser);
  }
}
