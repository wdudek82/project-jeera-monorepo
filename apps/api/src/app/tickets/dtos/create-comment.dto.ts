import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  content: string;

  @IsNumber()
  @Min(1)
  authorId: number;
}
