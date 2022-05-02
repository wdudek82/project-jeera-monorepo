import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Priority, Status } from '../enums';
import { Transform } from 'class-transformer';

export class CreateTicketDto {
  @IsString()
  @MinLength(5)
  @Transform(({ value }) => value.trim())
  title: string;

  @IsString()
  description: string;

  @ValidateIf((obj) => obj.authorId !== null)
  @IsNumber()
  @Min(1)
  authorId!: number | null;

  @ValidateIf((obj) => obj.assigneeId !== null)
  @IsNumber()
  @Min(1)
  assigneeId!: number | null;

  @IsEnum(Priority)
  @IsOptional()
  priority: Priority;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @ValidateIf((obj) => obj.relatedTicketId !== null)
  @IsNumber()
  @Min(1)
  relatedTicketId!: number | null;
}
