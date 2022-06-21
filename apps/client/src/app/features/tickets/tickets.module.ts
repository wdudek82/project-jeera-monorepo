import { NgModule } from '@angular/core';
import { SharedModule } from '@client/shared/shared.module';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketDetailsModalComponent } from './components/ticket-details-modal/ticket-details-modal.component';
import { TicketsComponent } from './tickets.component';
import { TicketFormComponent } from './components/ticket-details-modal/ticket-form/ticket-form.component';
import { CommentsFormComponent } from './components/ticket-details-modal/comments-form/comments-form.component';

@NgModule({
  declarations: [
    BacklogComponent,
    BoardComponent,
    TicketDetailsModalComponent,
    TicketsComponent,
    TicketFormComponent,
    CommentsFormComponent,
  ],
  imports: [SharedModule, TicketsRoutingModule],
})
export class TicketsModule {}
