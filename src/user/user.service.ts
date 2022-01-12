import { Injectable } from '@nestjs/common';

import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserType } from '@/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async checkPassword(user: UserEntity, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  public async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }

  public async findUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username });
  }

  public async createUser(username: string, password: string, type: UserType) {
    const user = new UserEntity();
    user.username = username;
    user.password = await UserService.hashPassword(password);
    user.type = type;
    await this.userRepository.save(user);
  }
}
