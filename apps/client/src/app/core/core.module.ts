import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HttpErrorInterceptor } from '@client/core/interceptors/http-error.interceptor';

const components = [MainLayoutComponent, PageNotFoundComponent];

@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [...components],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
})
export class CoreModule {}
