import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, take, throwError } from 'rxjs';
import { AuthService } from '@auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignedInUserResolver implements Resolve<number | Error> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<number | Error> {
    return this.authService.signedInUser$.pipe(
      take(1),
      map((userPartial) => {
        if (!userPartial || !userPartial.id) {
          // This situation should not be event possible,
          // but because signedInUser$ may be, at least in theory, null
          // this scenario has to be handled here to avoid later
          // redundant nullity checks.
          // The signedInUserId is user e.g. to fill in a "new ticket" field.
          throw new Error('No user is signed-in');
        }
        return userPartial.id;
      }),
      catchError((err) => {
        this.router.navigateByUrl('/signin');
        return throwError(err);
      }),
    );
  }
}
