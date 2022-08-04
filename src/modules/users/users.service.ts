import { Injectable } from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { User } from './entities/user.entity';
import { PrismaService } from '../../prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private static toInstance<T>(data: T) {
    return plainToInstance(User, data);
  }

  async create(data: CreateUserDto) {
    const now = new Date();
    const createdUser = await this.prismaService.user.create({
      data: {
        ...data,
        createdAt: now,
        updatedAt: now,
      },
    });
    return UsersService.toInstance(createdUser);
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => UsersService.toInstance(user));
  }

  async findOne(id: string) {
    const user = await this.getUserById(id);
    return UsersService.toInstance(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.getUpdatedUser(id, updateUserDto);
    const update = await this.prismaService.user.update({
      where: { id },
      data: updatedUser,
    });
    return UsersService.toInstance(update);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.prismaService.user.delete({ where: { id: user.id } });
  }

  private async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new ResourceNotFoundError('User');
    return user;
  }

  private async getUpdatedUser(id: string, updateUser: UpdateUserDto) {
    const user = await this.getUserById(id);

    if (user.password !== updateUser.oldPassword) {
      throw new HttpErrorByCode[StatusCodes.FORBIDDEN]();
    }

    user.password = updateUser.newPassword;
    user.updatedAt = new Date();
    user.version++;

    return user;
  }
}
