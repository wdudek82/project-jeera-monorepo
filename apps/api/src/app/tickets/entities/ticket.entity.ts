import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Priority, Status } from '../enums';
import { Comment } from './comment.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.NORMAL,
  })
  priority: Priority;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NEW,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })

  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  @Column({ nullable: true })
  assigneeId: number;

  @Column({ nullable: true })
  relatedTicketId?: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.id)
  @JoinColumn({ name: 'relatedTicketId' })
  relatedTicket?: Ticket;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];

  // estimatedTime: number;
  // dueDate: Date;
  // type: TicketType; // improvement, bug, story

  // TODO: Create entity "Attachment".
  // @Column()
  // attachments: Attachments[];

  @Column({ nullable: true })
  position: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
