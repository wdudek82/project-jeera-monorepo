import { Component, OnInit } from '@angular/core';
import { AuthService } from '@client/auth/auth.service';
import { first, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@client/core/models';
import { ToastrService } from 'ngx-toastr';

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
      .subscribe((value) => {
        this.router.navigateByUrl('/auth/signin');
      });
  }
}
