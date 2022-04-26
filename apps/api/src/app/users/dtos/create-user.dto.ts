import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsEnum(Role)
  role: Role = Role.USER;

  @IsBoolean()
  isActive = false;
}
