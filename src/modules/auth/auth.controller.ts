import { IUser } from '@interfaces/users/user';
import { logout } from '@lib/utils/logout';
import { GoogleGuard } from '@modules/auth/guards/google';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Request, Request as RequestType, Response } from 'express';

import { AuthService } from './auth.service';
import { GetGoogleDocs } from './docs/get-google';
import { LoginDocs } from './docs/login';
import { LogoutDocs } from './docs/logout';
import { RegisterDocs } from './docs/register';
import { VerifyEmailDocs } from './docs/verify-email';
import { LoginDto } from './dtos/login';
import { RegisterDto } from './dtos/register';
import { SendVerifyEmailDto } from './dtos/send-verify-email';
import { LocalAuthGuard } from './guards/local';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  @UseGuards(GoogleGuard)
  @GetGoogleDocs()
  googleLogin(): void {
    return;
  }

  @Get('google/redirect')
  @ApiExcludeEndpoint()
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: RequestType): Promise<Partial<IUser>> {
    return req.user as Partial<IUser>;
  }

  @Post('register')
  @RegisterDocs()
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return {
      message: 'user registered successfully and verification email sent',
    };
  }

  @UseGuards(LocalAuthGuard)
  @LoginDocs()
  @Post('login')
  async login(
    @Req() req: RequestType,
    @Body() _: LoginDto,
  ): Promise<Partial<IUser>> {
    return req.user as Partial<IUser>;
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @LogoutDocs()
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): void {
    logout(req, res);
  }

  @Get('verify-email/:token')
  @VerifyEmailDocs()
  async verifyEmail(
    @Param('token') token: string,
  ): Promise<{ message: string }> {
    if (!token) throw new BadRequestException('token is required');
    await this.authService.verifyEmailByToken(token);
    return { message: 'email verified successfully' };
  }

  @Post('send-verify-email')
  async sendVerifyEmail(
    @Body() { email }: SendVerifyEmailDto,
  ): Promise<{ message: string }> {
    await this.authService.sendVerifyEmail(email);
    return { message: 'verification email resent' };
  }
}
