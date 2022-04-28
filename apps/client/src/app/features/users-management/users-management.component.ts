import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UsersService} from '@client/core/services/users.service';
import { User } from '@client/core/types';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  usersColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'isActive',
  ];
  users: User[] = [];

  constructor(private usersService: UsersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.route.data.subscribe(({users}) => {
      this.users = users;
    });
  }
}
