import { Users } from './../../Models/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-details-users',
  template: ` <div class="main-container"></div> `,
  styles: [],
})
export class DetailsUsersComponent implements OnInit {
  id: any;
  data: any;
  users: any;

  constructor(private service: UsersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.id = this.route.snapshot.params.id;
    this.service.getUserById(this.id).subscribe((res) => {
      this.data = res;
      this.users = this.data.item;
      console.log(this.users);
    });
  }
}
