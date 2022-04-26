import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as Buffer from 'buffer';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private usersService: UsersService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    const { password, passwordConfirmation } = createUserDto;
    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        'password and confirm password does not match',
      );
    }

    // TODO: replace with bcryptjs?
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    createUserDto.password = `${salt}.${hash.toString('hex')}`;

    return this.usersService.create(createUserDto);
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('incorrect email');
    }
    if (!user.isActive) {
      throw new BadRequestException('inactive account');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash != hash.toString('hex')) {
      throw new BadRequestException('incorrect password');
    }
    return user;
  }
}
