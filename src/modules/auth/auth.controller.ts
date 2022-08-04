import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService, JwtTokens } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokens } from './refresh-tokens';
import { ValidateRefreshTokenPipe } from './jwt/validate-refresh-token.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    await this.authService.create(user);
    return { message: 'User has been created!' };
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() user: CreateUserDto): Promise<JwtTokens> {
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  refresh(@Body(ValidateRefreshTokenPipe) { refreshToken }: RefreshTokens) {
    return this.authService.refreshTokens(refreshToken);
  }
}
