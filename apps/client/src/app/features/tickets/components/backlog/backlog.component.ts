import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Ticket } from '@client/tickets/models';
import {
  TicketDetailsModalComponent,
  TicketModalData,
} from '../ticket-details-modal/ticket-details-modal.component';
import { TicketsService } from '@client/tickets/tickets.service';
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from "@angular/material/paginator";
import { User } from '@client/core/types';
import { PROJECT_ALIAS } from '@client/core/types/constants';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  title = 'learning-testing-2022-frontend';
  ticketsDataSource: MatTableDataSource<any> = new MatTableDataSource<Ticket>();
  tickets: Ticket[] = [];
  ticketsColumns: string[] = ['id', 'title', 'status', 'priority'];
  users: User[] = [];
  signedInUserId!: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private ticketsService: TicketsService,
    private toastr: ToastrService,
  ) {}

  ngAfterViewInit(): void {
    this.getTickets();
    this.getUsers();
  }

  getTickets(): void {
    this.route.data.subscribe(({ tickets, users }) => {
      this.tickets = tickets;
      this.ticketsDataSource = new MatTableDataSource<Ticket>(this.tickets);
      this.ticketsDataSource.paginator = this.paginator;
      // this.calculateTicketsPositions();
    });
  }

  reloadTickets(): void {
    this.ticketsService.getTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.ticketsDataSource.data = this.tickets;
      },
    });
  }

  getUsers(): void {
    this.route.data.subscribe(({ users, signedInUserId }) => {
      this.users = users;
      this.signedInUserId = signedInUserId;
    });
  }

  getTableCellValue(column: string, element: string): string {
    // TODO: The main idea for this method is adding PROJECT_ALIAS before
    //  ticket id. Probably overkill/messy solution.
    //  Maybe directive would be better? Or pipe? Filter? What would be cleaner?
    return column === 'id' ? `${PROJECT_ALIAS}-${element}` : element;
  }

  calculateTicketsPositions(): void {
    this.tickets.map((t, index) => {
      t.position = index + 1;
      return t;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketsDataSource.filter = filterValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>) {
    // TODO: after successful drag and drop store new positions values in the Database
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
    this.calculateTicketsPositions();
    this.ticketsDataSource.data = this.tickets;
  }

  createNewTicket(): void {
    this.openTicketModal({
      tickets: this.tickets,
      users: this.users,
      authorId: this.signedInUserId,
    });
  }

  updateTicket(ticketId: number): void {
    this.ticketsService.getTicketById(ticketId).subscribe({
      next: (ticket) => {
        this.openTicketModal({
          tickets: this.tickets,
          users: this.users,
          ticket,
          authorId: ticket.authorId,
        });
      }
    });
  }

  openTicketModal(data: TicketModalData): void {
    const dialogRef = this.dialog.open(TicketDetailsModalComponent, {
      width: '700px',
      data,
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed. Result: ${result}`);
      this.reloadTickets();
    });
  }
}
