import { Request } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  CreateCommentDto,
  CreateTicketDto,
  UpdateCommentDto,
  UpdateTicketDto,
} from './dtos';

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
  getTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findById(+id);
  }

  @Post()
  createTicket(
    @Req() req: Request,
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<Ticket> {
    const currentUser = req['currentUser'];

    if (currentUser.id !== createTicketDto.authorId) {
      // Just to confirm data sent by the client.
      throw new BadRequestException(
        'Author is not a currently signed-in user!',
      );
    }

    return this.ticketsService.create(createTicketDto);
  }

  @Patch('/:id')
  updateTicket(
    @Param('id') id: string,
    @Body() body: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(+id, body);
  }

  @Delete('/:id')
  softDeleteTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.softDelete(+id);
  }

  @Post('/:ticketId/comments')
  addComment(
    @Param('ticketId') ticketId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    const { content, authorId } = body;

    // TODO: Add better error handling for incorrect FKs:
    //  authorId, ticketId (its just HTTP 500 right now).
    return this.commentsService.create(content, authorId, +ticketId);
  }

  @Patch('/:ticketId/comments/:commentId')
  updateTicketComment(
    @Param('commentId') commentId: string,
    @Body() body: UpdateCommentDto,
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
