import { IUser } from '@interfaces/users/user';
import { logout } from '@lib/utils/logout';
import { GoogleGuard } from '@modules/auth/guards/google';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { LoginDto } from './dtos/login';
import { RegisterDto } from './dtos/register';
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @RegisterDocs()
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
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
}
