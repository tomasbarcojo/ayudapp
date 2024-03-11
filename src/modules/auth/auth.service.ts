import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { CreateUserInput } from '../user/dto/create-user-input.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signupLocal(dto: CreateUserInput): Promise<Tokens> {
    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.userService.create({ ...dto, password: hashedPassword });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<{ tokens: Tokens; user: Partial<User> }> {
    const user = await this.userService.getOne({ username: dto.username });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, hashedRt, ...rest } = user;
    return { tokens, user: rest };
  }

  async logout(userId: number) {
    await this.userService.update({ id: userId }, { hashedRt: null });
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.userService.getOne({ id: userId });

    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.userService.update({ id: userId }, { hashedRt: hash });
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_AT_SECRET_KEY'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_RT_SECRET_KEY'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
