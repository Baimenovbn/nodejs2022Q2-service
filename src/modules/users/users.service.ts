import { Injectable } from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private getUpdatedUser(id: string, updateUser: UpdateUserDto) {
    const user = this.findOne(id);

    if (user.password !== updateUser.oldPassword) {
      throw new HttpErrorByCode[StatusCodes.FORBIDDEN]();
    }

    user.password = updateUser.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return user;
  }

  create(createUserDto: CreateUserDto) {
    return new User(UsersRepository.create(createUserDto));
  }

  findAll() {
    return UsersRepository.getAll().map((user) => new User(user));
  }

  findOne(id: string) {
    const user = UsersRepository.getById(id);
    if (!user) throw new ResourceNotFoundError('User');
    return new User(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.getUpdatedUser(id, updateUserDto);
    return new User(UsersRepository.update(id, updatedUser));
  }

  remove(id: string) {
    const user = this.findOne(id);
    return UsersRepository.removeById(user.id);
  }
}
