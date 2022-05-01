import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@client/environments/environment';
import { Ticket, TicketComment } from './models';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private rootUrl = environment.apiUrl + '/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.rootUrl);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.rootUrl}/${id}`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.rootUrl, ticket);
  }

  updateTicket(id: number, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.rootUrl}/${id}`, ticket);
  }

  addComment(
    ticketId: number,
    comment: TicketComment,
  ): Observable<TicketComment> {
    return this.http
      .post<TicketComment>(`${this.rootUrl}/${ticketId}/comments`, comment)
      .pipe(tap((value) => console.log(value)));
  }

  deleteComment(
    ticketId: number,
    commentId: number,
  ): Observable<TicketComment> {
    return this.http.delete<TicketComment>(
      `${this.rootUrl}/${ticketId}/comments/${commentId}`,
    );
  }
}
