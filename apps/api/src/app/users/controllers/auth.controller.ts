import { Request, Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { SigninUserDto } from '../dtos/sigin-user.dto';
import { UserDto } from '../dtos/user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Role } from '../enums';

export interface SessionData {
  userId: number;
}

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  whoAmI(@Req() req: Request, @Res() res: Response): void {
    const user = req['currentUser'];
    res.status(HttpStatus.OK).json({
      authenticated: !!user,
      signedInUser: !user
        ? null
        : {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
    });
  }

  @Post('/create-user')
  // @UseGuards(AuthGuard)
  createUser(
    @Body() body: CreateUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    if (currentUser?.role !== Role.ADMIN && body.isActive) {
      throw new UnauthorizedException(
        'only admins are authorized to create active users',
      );
    }
    return this.authService.createUser(body);
  }

  @Post('/signup')
  async signUp(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    // TODO: This rout is tempararily disabled.
    //  Users will be probably created only by admins.
    // const user = await this.authService.createUser(body);
    // session.userId = user.id;
    // return user;
    throw new BadRequestException(
      'this endpoint has been temporarily disabled',
    );
  }

  @Post('/signin')
  async signIn(
    @Body() body: SigninUserDto,
    @Session() session: SessionData,
  ): Promise<User> {
    const { email, password } = body;
    const user = await this.authService.signIn(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Req() req: Request, @Res() res: Response): void {
    req['session'] = null;
    res.status(HttpStatus.RESET_CONTENT).json({});
  }
}
