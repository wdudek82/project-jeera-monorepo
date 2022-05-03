import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dtos';

@Injectable()
export class TicketsService {
  constructor(@InjectRepository(Ticket) private repo: Repository<Ticket>) {}

  async create(ticketData: CreateTicketDto): Promise<Ticket> {
    const ticket = this.repo.create(ticketData);
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
