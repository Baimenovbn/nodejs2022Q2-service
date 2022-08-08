import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateRefreshTokenPipe implements PipeTransform {
  constructor(private readonly jwtService: JwtService) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body') {
      if (!value.hasOwnProperty('refreshToken'))
        throw new UnauthorizedException();

      if (!this.isValidJwt(value.refreshToken)) throw new ForbiddenException();
    }

    return value;
  }

  private isValidJwt(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      });
    } catch (e) {
      return null;
    }
  }
}
