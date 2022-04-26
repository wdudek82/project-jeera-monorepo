import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.comments, {
    onUpdate: 'NO ACTION',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @Column()
  content: string;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: 'NO ACTION',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
