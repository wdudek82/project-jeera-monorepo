import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@client/auth/auth.service';
import { User } from '@client/core/types';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  signedIn$!: Observable<Partial<User> | null>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.signedIn$ = this.authService.signedInUser$;
  }

  signOut() {
    this.authService.signedInUser$
      .pipe(
        first(),
        tap((user) =>
          this.toastr.success(`See you later ${user?.name}!`, 'Signed out!'),
        ),
        switchMap(() => this.authService.signOut()),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/auth/signin');
      });
  }
}
