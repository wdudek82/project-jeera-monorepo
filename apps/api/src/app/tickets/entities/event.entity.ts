import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class Event {
  // item (User, Ticket)
  // type (added, deleted, commented by
  // Maybe subclass?
  //  CommentEvent
  //  UserEvent
  //  TicketEvent

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
