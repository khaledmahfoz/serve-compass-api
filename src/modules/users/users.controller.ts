import { IUser } from '@interfaces/users/user';
import { Serializer } from '@lib/decorators/serializer';
import { AuthorizationGuard } from '@lib/guards/authorization';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { DeleteUserDocs } from './docs/delete-user';
import { GetUserDocs } from './docs/get-user';
import { UpdateUserDocs } from './docs/update-user';
import { UsersDocs } from './docs/users';
import { UpdateUserDto } from './dtos/update-user';
import { UserDto } from './dtos/user';
import { UsersService } from './users.service';

@UsersDocs()
@Serializer({ type: UserDto })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  @GetUserDocs()
  @UseGuards(AuthorizationGuard)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    return this.usersService.getUser(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @UpdateUserDocs()
  @UseGuards(AuthorizationGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    if (!updateUserDto) return;
    await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @DeleteUserDocs()
  @UseGuards(AuthorizationGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
