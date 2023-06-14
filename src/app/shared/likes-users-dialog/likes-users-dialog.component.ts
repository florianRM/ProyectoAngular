import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtPayload } from 'jwt-decode';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/auth/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/interfaces/follow';
import { Like } from 'src/interfaces/like';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-likes-users-dialog',
  templateUrl: './likes-users-dialog.component.html',
  styleUrls: ['./likes-users-dialog.component.css']
})
export class LikesUsersDialogComponent implements OnInit {

  userLiked: Like[] = [];
  userInfo!: JwtPayload;
  follows: Follow[] = [];
  followedUsers: { [username: string]: boolean } = {};

  constructor(private config: DynamicDialogConfig, private authService: AuthService, private followService: FollowService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.user;
    this.userLiked = this.config.data.post.likes;
    this.getFollows();
  }

  getFollows(): void {
    this.followService.getFollowed()
    .subscribe({
      next: (res: Follow[]) => {
        this.follows = res;
        this.followedUsers = {};
        this.follows.forEach((follow: Follow) => {
          this.followedUsers[follow.followed] = true;
        });
      }
    })
  }

  isFollowed(username: string): boolean {
    return !!this.followedUsers[username];
  }

  followUser(followed: string): void {
    const user: string = this.authService.user.sub;
    this.followService.followUser(user, followed)
    .subscribe({
      next: () => {
        this.getFollows();
        this.sharedService.refreshExistPosts();
        this.sharedService.refreshUser();
      }
    })

  }

  unfollowUser(followed: string): void {
    this.followService.unfollowUser(followed)
    .subscribe({
      next: () => {
        this.getFollows();
        this.sharedService.refreshExistPosts();
        this.sharedService.refreshUser();
      }
    })
  }

}
