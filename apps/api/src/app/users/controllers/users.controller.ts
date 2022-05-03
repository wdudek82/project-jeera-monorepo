import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { SetUserActiveStateDto, UpdateUserDto, UserDto } from '../dtos';
import { User } from '../entities/user.entity';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query('email') email: string): Promise<User | User[]> {
    if (email) {
      return this.usersService.findOneByEmail(email);
    }
    return this.usersService.find();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  getFilteredUsers(@Body() body: any): Promise<User[]> {
    // TODO: Implement users filters.
    // TODO: Use this endpoint instead getUsers with "email" query param.
    return Promise.resolve([]);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, body);
  }

  @Patch('/:id/activation-state')
  @UseGuards(AuthGuard)
  async setActiveState(
    @Param('id') id: string,
    @Body() body: SetUserActiveStateDto,
    @Res() res: Response,
  ): Promise<void> {
    // TODO: This endpoint should be accessible only for authorized users.
    // TODO: I'm extracting isActive from body to prevent changing anything else.
    //  Can this be made better? How to reject body containing anything else?
    await this.usersService.update(+id, { isActive: body.isActive });
    res.status(HttpStatus.NO_CONTENT).json();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  softDeleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.softDelete(+id);
  }
}
