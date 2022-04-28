import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { AuthService } from '@client/auth/auth.service';
import { User } from '@client/core/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signedIn$: Observable<Partial<User> | null>;

  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedInUser$;
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe();
  }
}
