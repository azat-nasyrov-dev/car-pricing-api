import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { USER_NOT_FOUND_ERROR } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }

  public async findListOfUsers(email: string): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { email } });
  }

  public async findUserById(id: number): Promise<UserEntity> {
    if (!id) {
      return null;
    }

    return await this.userRepository.findOne({ where: { id } });
  }

  public async removeUserById(id: number): Promise<UserEntity> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return await this.userRepository.remove(user);
  }

  public async updateUserById(
    id: number,
    attrs: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }
}
