import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  @Min(1)
  authorId: number;
}
