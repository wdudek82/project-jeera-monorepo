import { Component, OnInit } from '@angular/core';
import { AuthService } from '@client/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '@client/core/models';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signedIn$!: Observable<Partial<User> | null>;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.signedIn$ = this.authService.signedInUser$;
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: () => undefined,
      error: (_err) => {
        this.toastr.error('Something went wrong', 'Error');
      }
    });
  }
}
