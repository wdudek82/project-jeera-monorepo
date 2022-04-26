import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '@client/environments/environment';
import { User } from '@client/core/models';
import {
  CheckAuthRes,
  SignInCredentials,
  SignInRes,
  SignUpCredentials,
  SignUpRes,
} from '@client/auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private signedInUserSubject = new ReplaySubject<Partial<User> | null>(1);
  signedInUser$ = this.signedInUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<User | void> {
    // TODO: Update this method when users filters are ready on the backend
    return this.http.get<User | void>(`${this.apiUrl}/users`, {
      params: { email },
    });
  }

  checkAuth(): Observable<CheckAuthRes> {
    return this.http.get<CheckAuthRes>(`${this.apiUrl}/auth/whoami`).pipe(
      tap((res) => {
        this.signedInUserSubject.next(res.signedInUser);
      }),
    );
  }

  createUser(user: SignUpCredentials): Observable<SignUpRes> {
    return this.http.post<SignUpRes>(`${this.apiUrl}/auth/create-user`, user);
  }

  signIn(credentials: SignInCredentials): Observable<SignInRes> {
    return this.http
      .post<SignInRes>(`${this.apiUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ id, name, email, role }) => {

          this.signedInUserSubject.next({ id, name, email, role });
        }),
      );
  }

  signOut(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedInUserSubject.next(null);
      }),
    );
  }
}
