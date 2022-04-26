import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  create(
    content: string,
    authorId: number,
    ticketId: number,
  ): Promise<Comment> {
    const comment = this.repo.create({ content, authorId, ticketId });
    return this.repo.save(comment);
  }

  async update(id: number, attrs: Partial<Comment>): Promise<Comment> {
    const comment = await this.repo.findOne(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    Object.assign(comment, attrs);
    return this.repo.save(comment);
  }

  async remove(id: number): Promise<Comment> {
    const comment = await this.repo.findOne(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return await this.repo.remove(comment);
  }

  async softDelete(id: number): Promise<Comment> {
    const comment = await this.repo.findOne(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    comment.deletedAt = new Date();
    return this.repo.save(comment);
  }
}
