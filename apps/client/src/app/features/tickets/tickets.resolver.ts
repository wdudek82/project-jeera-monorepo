import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TicketsService } from '@client/tickets/tickets.service';
import { Ticket } from '@client/tickets/models';

@Injectable({
  providedIn: 'root',
})
export class TicketsResolver implements Resolve<Ticket[]> {
  constructor(private ticketsService: TicketsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Ticket[]> {
    return this.ticketsService.getTickets();
  }
}
