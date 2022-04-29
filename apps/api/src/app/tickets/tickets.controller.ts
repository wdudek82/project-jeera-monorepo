import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('tickets')
@UseGuards(AuthGuard)
export class TicketsController {
  constructor(
    private ticketsService: TicketsService,
    private commentsService: CommentsService,
  ) {}

  @Get()
  getTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get('/:id')
  getTicket(@Param('id') id: string): any {
    return this.ticketsService.findById(+id);
  }

  @Post()
  createTicket(@Body() body: any): Promise<Ticket> {
    const {
      title,
      description,
      authorId,
      assigneeId,
      priority,
      status,
      relatedTicketId,
    } = body;
    return this.ticketsService.create(
      title,
      description,
      authorId,
      assigneeId,
      priority,
      status,
      relatedTicketId,
    );
  }

  @Patch('/:id')
  updateTicket(@Param('id') id: string, @Body() body: any): Promise<Ticket> {
    // TODO: use UpdateTicketDto instead of any
    return this.ticketsService.update(+id, body);
  }

  @Delete('/:id')
  softDeleteTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.softDelete(+id);
  }

  @Post('/:ticketId/comments')
  addComment(
    @Param('ticketId') ticketId: string,
    @Body() body: any,
  ): Promise<any> {
    const { content, authorId } = body;

    // TODO: Add better error handling for incorrect FKs:
    //  authorId, ticketId (its just HTTP 500 right now).
    return this.commentsService.create(content, authorId, +ticketId);
  }

  @Patch('/:ticketId/comments/:commentId')
  updateTicketComment(
    @Param('commentId') commentId: string,
    @Body() body: any,
  ): Promise<Comment> {
    return this.commentsService.update(+commentId, body);
  }

  @Delete('/:ticketId/comments/:commentId')
  softDeleteTicketComment(
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return this.commentsService.softDelete(+commentId);
  }
}
