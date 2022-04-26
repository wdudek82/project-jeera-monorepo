import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { AuthGuard } from '@client/auth/guards/auth.guard';
import { TicketsResolver } from '@client/tickets/tickets.resolver';
import { UsersResolver } from '@client/core/resolvers/users.resolver';
import { SignedInUserResolver } from '@client/auth/resolvers/signed-in-user.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: BacklogComponent,
    resolve: {
      signedInUserId: SignedInUserResolver,
      tickets: TicketsResolver,
      users: UsersResolver,
    },
  },
  {
    path: 'board',
    canActivate: [AuthGuard],
    component: BoardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
