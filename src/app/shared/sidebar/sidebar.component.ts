import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../shared.service';
import { User } from '../../auth/interface/user';
import { FollowedPostService } from 'src/app/home/followed-post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user!: User;
  _existPosts: boolean = true;

  constructor(private authService: AuthService, private sharedService: SharedService, private followedPostService: FollowedPostService) { }

  ngOnInit(): void {
    this.userInfo();
    this.existPosts();
  }

  userInfo(): void {
    this.sharedService.getUser()
    .subscribe({
      next: res => {
        this.user = res;
      },
      error: err => console.log(err)
    })
  }

  existPosts(): void {
    this.followedPostService.followedPosts()
    .subscribe({
      next: (res) => {
        if(!res.totalElements) {
          this._existPosts = false
        }
      }
    })
  }

  isMobile(): boolean {
    if(window.screen.width < 480) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
  }

}
