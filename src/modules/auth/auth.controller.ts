import { IUser } from '@interfaces/users/user';
import { User } from '@lib/decorators/user';
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
import { ChangeEmailDocs } from './docs/change-email';
import { ChangePasswordDocs } from './docs/change-password';
import { GetGoogleDocs } from './docs/get-google';
import { LoginDocs } from './docs/login';
import { LogoutDocs } from './docs/logout';
import { RegisterDocs } from './docs/register';
import { ResetPasswordDocs } from './docs/reset-password';
import { SendResetPasswordEmailDocs } from './docs/send-reset-password-email';
import { SendVerifyEmailDocs } from './docs/send-verify-email';
import { VerifyEmailDocs } from './docs/verify-email';
import { ChangeEmailDto } from './dtos/change-email';
import { ChangePasswordDto } from './dtos/change-password';
import { LoginDto } from './dtos/login';
import { RegisterDto } from './dtos/register';
import { ResetPasswordDto } from './dtos/reset-password';
import { SendUpdatePasswordDto } from './dtos/send-update-password';
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

  @Post('change-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ChangeEmailDocs()
  async changeEmail(
    @User() user: IUser,
    @Body() changeEmailDto: ChangeEmailDto,
  ): Promise<void> {
    await this.authService.changeEmail(user.id, changeEmailDto);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ChangePasswordDocs()
  async changePassword(
    @User() user: IUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    await this.authService.changePassword(user.id, changePasswordDto);
  }

  @Post('send-verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SendVerifyEmailDocs()
  async sendVerifyEmail(@Body() { email }: SendVerifyEmailDto): Promise<void> {
    await this.authService.sendVerifyEmail(email);
  }

  @Post('verify-email/:token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @VerifyEmailDocs()
  async verifyEmail(@Param('token') token: string): Promise<void> {
    if (!token) throw new BadRequestException('token is required');
    await this.authService.verifyEmailByToken(token);
  }

  @Post('send-reset-password-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SendResetPasswordEmailDocs()
  async sendResetPasswordEmail(
    @Body() { email }: SendUpdatePasswordDto,
  ): Promise<void> {
    await this.authService.sendUpdatePasswordEmail(email);
  }

  @Post('reset-password/:token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResetPasswordDocs()
  async resetPassword(
    @Param('token') token: string,
    @Body() { newPassword }: ResetPasswordDto,
  ): Promise<void> {
    if (!token) throw new BadRequestException('token is required');
    await this.authService.updatePasswordByToken(token, newPassword);
  }
}
