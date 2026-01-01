import { IUser } from '@interfaces/users/user';
import { Serializer } from '@lib/decorators/serializer';
import { AuthorizationGuard } from '@lib/guards/authorization';
import { createImageUploadOptions } from '@lib/utils/image-upload-options';
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
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { DeleteUserDocs } from './docs/delete-user';
import { DeleteUserImageDocs } from './docs/delete-user-image';
import { GetUserDocs } from './docs/get-user';
import { UpdateUserDocs } from './docs/update-user';
import { UploadUserImageDocs } from './docs/upload-user-image';
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

  @Post(':id/image')
  @UseGuards(AuthorizationGuard)
  @UploadUserImageDocs()
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(createImageUploadOptions())
    image: Express.Multer.File,
  ): Promise<void> {
    return this.usersService.uploadUserImage(id, image);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthorizationGuard)
  @DeleteUserImageDocs()
  @Delete(':id/image')
  async deleteUserImage(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUserImage(id);
  }
}
