import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { isAuthenticationError } from '@client/core/types/enums';

interface HttpErrorMessage {
  title: string;
  message: string;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  private handleClientSideError(message: string): void {
    this.toastr.error(message, 'Error');
  }

  private handleServerSideError(
    status: number,
    errorName: string,
    message: string,
  ): void {
    let title = 'Error';
    let errorMessage = '';

    switch (status) {
      case 0:
        errorMessage = 'Connection Error';
        break;
      case 401:
        errorMessage = '401 Unauthorized';
        break;
      case 403:
        errorMessage = '403 Forbidden';
        break;
      case 400:
      case 404:
        if (isAuthenticationError(message)) {
          // do nothing if it is auth error;
        } else {
          title = errorName ?? 'Error';
          errorMessage = Array.isArray(message)
            ? message.join('<br>')
            : message;
        }
        break;
      default:
        errorMessage = 'Something went wrong';
    }

    if (errorMessage) {
      this.toastr.error(errorMessage, title);
    }
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      // TODO: Should not retry on signIn error
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          const errorMessage = `Error: ${error.error.message}`;
          this.handleClientSideError(errorMessage);
        } else {
          this.handleServerSideError(
            error.status,
            error.error.error,
            error.error.message,
          );
        }

        return throwError(error);
      }),
    );
  }
}
