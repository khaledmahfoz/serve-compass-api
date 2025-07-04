import { ISerializedUser } from '@interfaces/users/serialized-user';
import { IUser } from '@interfaces/users/user';
import { User } from '@lib/decorators/user';
import { logout } from '@lib/utils/logout';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { DeleteUserDocs } from './docs/delete-user';
import { GetUserDocs } from './docs/get-user';
import { UpdateUserDocs } from './docs/update-user';
import { UsersDocs } from './docs/users';
import { UpdateUserDto } from './dtos/update-user';
import { UsersService } from './users.service';

@UsersDocs()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @GetUserDocs()
  async getUser(@User() user: ISerializedUser): Promise<IUser> {
    return this.usersService.getUser(user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch()
  @UpdateUserDocs()
  async updateUser(
    @User() user: ISerializedUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    if (!updateUserDto) return;
    await this.usersService.updateUser(user.id, updateUserDto);
  }

  @Delete()
  @DeleteUserDocs()
  async deleteUser(
    @User() user: ISerializedUser,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    if (user.role !== null)
      throw new ForbiddenException({
        message: 'staff accounts cannot be deleted',
      });
    await this.usersService.deleteUser(user.id);
    logout(req, res);
  }
}
