import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../shared.service';
import { User } from '../../auth/interface/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user!: User;

  constructor(private authService: AuthService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo(): void {
    this.sharedService.getUser()
    .subscribe({
      next: res => {
        this.user = res
        console.log(res)
      },
      error: err => console.log(err)
    })
  }

  logout(): void {
    this.authService.logout();
  }

}
