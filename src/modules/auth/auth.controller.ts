import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { CreateUserInput } from '../user/dto/create-user-input.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/local/signup')
  signupLocal(@Body() dto: CreateUserInput): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/local/signin')
  signinLocal(@Body() dto: AuthDto): Promise<{ tokens: Tokens; user: Partial<User> }> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
