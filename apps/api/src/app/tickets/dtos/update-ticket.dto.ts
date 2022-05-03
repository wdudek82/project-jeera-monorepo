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

export class UpdateTicketDto {
  @IsOptional()
  @ValidateIf((obj) => obj.description !== null)
  @IsString()
  @MinLength(5)
  @Transform(({ value }) => value.trim())
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @ValidateIf((obj) => obj.authorId !== null)
  @IsNumber()
  @Min(1)
  authorId!: number | null;

  @IsOptional()
  @ValidateIf((obj) => {
    console.log(obj);
    return obj.assigneeId !== null;
  })
  @IsNumber()
  @Min(1)
  assigneeId!: number | null;

  @IsOptional()
  @IsEnum(Priority)
  @IsOptional()
  priority: Priority;

  @IsOptional()
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsOptional()
  @ValidateIf((obj) => obj.relatedTicketId !== null)
  @IsNumber()
  @Min(1)
  relatedTicketId!: number | null;
}
