import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { Priority, Status } from './enums';

@Injectable()
export class TicketsService {
  constructor(@InjectRepository(Ticket) private repo: Repository<Ticket>) {}

  create(
    title: string,
    description: string,
    authorId: number,
    assigneeId: number,
    priority: Priority,
    status: Status,
    relatedTicketId: number,
  ): Promise<Ticket> {
    const ticket = this.repo.create({
      title,
      description,
      authorId,
      assigneeId,
      priority,
      status,
      relatedTicketId,
    });
    return this.repo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Ticket | null> {
    const ticket = await this.repo.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!ticket) {
      throw new NotFoundException('user not found');
    }
    return ticket;
  }

  async update(id: number, attrs: Partial<Ticket>): Promise<Ticket> {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('ticket not found');
    }
    Object.assign(ticket, attrs);
    return this.repo.save(ticket);
  }

  async remove(id: number): Promise<Ticket> {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('ticket not found');
    }
    return this.repo.remove(ticket);
  }

  async softDelete(id: number): Promise<Ticket> {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('ticket not found');
    }
    ticket.deletedAt = new Date();
    return this.repo.save(ticket);
  }
}
