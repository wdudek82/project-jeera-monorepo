import { IsString } from 'class-validator';

export class SigninUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
