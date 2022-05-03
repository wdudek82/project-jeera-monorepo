import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCommentDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  content: string;
}
