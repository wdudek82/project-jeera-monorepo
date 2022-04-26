import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@client/core/components/page-not-found/page-not-found.component';
import { SignupComponent } from '@client/auth/signup/signup.component';
import { SigninComponent } from '@client/auth/signin/signin.component';
import { AuthGuard } from '@client/auth/guards/auth.guard';
import { SignedInGuard } from '@client/auth/guards/signed-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tickets',
  },
  {
    path: 'auth',
    pathMatch: 'full',
    redirectTo: 'auth/signin',
  },
  {
    path: 'auth',
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
    ],
    canActivate: [SignedInGuard],
  },
  {
    path: 'tickets',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./features/tickets/tickets.module').then((m) => m.TicketsModule),
  },
  {
    path: 'users',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./features/users-management/users-management.module').then(
        (m) => m.UsersManagementModule,
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
