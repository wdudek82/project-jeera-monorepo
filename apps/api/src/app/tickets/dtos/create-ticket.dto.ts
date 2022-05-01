import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Priority, Status } from '../enums';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @ValidateIf((obj) => obj.authorId !== null)
  @IsNumber()
  @Min(1)
  authorId!: number | null;

  @ValidateIf((obj) => {
    console.log(obj);
    return obj.assigneeId !== null;
  })
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
