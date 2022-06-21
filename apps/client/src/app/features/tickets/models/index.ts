export enum Priority {
  VERY_LOW = 'very_low',
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum TicketStatus {
  NEW = 'new',
  TO_DO = 'to_do',
  DESIGN = 'design',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  TESTING = 'testing',
  DONE = 'done',
  CANCELLED = 'cancelled',
}

export interface TicketComment {
  id: number;
  ticketId: number;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Ticket {
  id: number | string;
  title: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  authorId: number;
  assigneeId: number | null;
  relatedTicketId: number | null;
  position: number | null;
  comments: TicketComment[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// TODO: Move to a separate file with form/material specific interfaces
export interface SelectOption {
  value: number | string;
  viewValue: string;
}
