import { NgModule } from '@angular/core';
import { SharedModule } from '@client/shared/shared.module';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { DialogOverviewExample } from './components/dialog-overview-example/dialog-overview-example.component';
import { TicketDetailsModalComponent } from './components/ticket-details-modal/ticket-details-modal.component';
import { TicketsComponent } from './tickets.component';

@NgModule({
  declarations: [
    BacklogComponent,
    BoardComponent,
    DialogOverviewExample,
    TicketDetailsModalComponent,
    TicketsComponent,
  ],
  imports: [SharedModule, TicketsRoutingModule],
})
export class TicketsModule {}
