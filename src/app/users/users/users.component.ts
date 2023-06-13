import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/interface/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];
  cols: any[] = [];
  totalRecords: number = 0;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe({
      next: res => {
        this.users = res;
        this.totalRecords = res.length;
      }
    })
    this.cols = [
      {field: 'username', header: 'Username'},
      {field: 'email', header: 'Email'},
      {field: 'name', header: 'Name'},
      {field: 'creationDate', header: 'Creation Date'},
      {field: 'enabled', header: 'Enabled'},
    ]
  }

  enabledUser(user: User): void {
    this.userService.enabledUser(user.username, !user.enabled)
    .subscribe({
      next: res => {console.log(res),
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(["/users"]));
        this.ngOnInit();
      },
      error: err => console.log(err)
    })
  }

}
