import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { getUserWithHashedPassword } from '../../utils/bcrypt-mediator';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: CreateUserDto) {
    const userWithHashedPassword = await getUserWithHashedPassword(user);

    return this.usersService.create(userWithHashedPassword);
  }

  async login(user: CreateUserDto): Promise<JwtTokens> {
    const validatedUser = await this.getValidatedUser(user);

    if (!validatedUser) throw new ForbiddenException();

    return this.getTokens(validatedUser.id, validatedUser.login);
  }

  async getValidatedUser(user: CreateUserDto) {
    const foundUser = await this.usersService.getUserByLogin(user);

    const isValidUser =
      foundUser && (await compare(user.password, foundUser.password));

    if (!isValidUser) {
      return null;
    }

    const { password, ...withoutPassword } = foundUser;

    return withoutPassword;
  }

  refreshTokens(refreshToken: string) {
    const { login, userId } = this.jwtService.decode(refreshToken, {}) as {
      login: string;
      userId: string;
    };

    return this.getTokens(userId, login);
  }

  private getTokens(userId: string, login: string) {
    const payload = { login, userId };

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
