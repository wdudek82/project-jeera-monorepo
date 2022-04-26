import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  // TODO: Implement double check, i.e.
  //  when password is changed, it has to be typed twice.
  //  And then both password fields are required.
  @IsString()
  @IsOptional()
  password: string;
}
