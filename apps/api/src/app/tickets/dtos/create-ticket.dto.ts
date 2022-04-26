import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, Status } from '../enums';

class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Priority)
  @IsOptional()
  priority: Priority;

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
