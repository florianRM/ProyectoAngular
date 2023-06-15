import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interface/user';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../auth/auth.service';
import { JwtPayload } from 'jwt-decode';
import { FollowService } from '../../services/follow.service';
import { LikeService } from 'src/app/services/like.service';
import { Router } from '@angular/router';
import { Like } from 'src/interfaces/like';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LikesUsersDialogComponent } from 'src/app/shared/likes-users-dialog/likes-users-dialog.component';
import { CommentsDialogComponent } from 'src/app/shared/comments-dialog/comments-dialog.component';
import { Follow } from 'src/interfaces/follow';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [DialogService]
})
export class PostComponent implements OnInit {

  state: string[] = [];
  posts: Post[] = [];
  userInfo!: JwtPayload;
  likedPosts: Like[] = [];
  follows: Follow[] = [];
  followedUsers: { [username: string]: boolean } = {};
  followsSubscription!: Subscription;
  likesDialogRef!: DynamicDialogRef;


  constructor(private dialogService: DialogService, 
            private postService: PostService, 
            private authService: AuthService, 
            private followService: FollowService, 
            private likeService: LikeService, 
            private router: Router,
            private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.user;
    this.postService.getPosts()
    .subscribe({
      next: res => {
        this.posts = res;
      },
      error: err => console.log(err)
    });
    this.likeService.getLikes()
    .subscribe({
      next: res => this.likedPosts = res,
      error: err => this.router.navigate(['/error'])
    });
    this.getFollows();
  }

  openCommentDialog(postId: number): void {
    this.dialogService.open(CommentsDialogComponent, {
      header: "Comments",
      data: {
        id: postId
      },
      baseZIndex: 9999999999,
    })
  }

  openLikesDialog(post: Post): void {
     this.likesDialogRef = this.dialogService.open(LikesUsersDialogComponent, {
      header: 'Likes',
      data: {
        post,
        followedUsers: this.followedUsers
      }
    });
  }

  getFollows(): void {
    if(this.followsSubscription) {
      this.followsSubscription.unsubscribe();
    }

    this.followsSubscription = this.followService.getFollowed()
    .subscribe({
      next: (res: Follow[]) => {
        this.follows = res;
        this.followedUsers = {}
        this.follows.forEach((follow: Follow) => {
          this.followedUsers[follow.followed] = true;
        });
      }
    })
  }

  isFollowed(username: string): boolean {
    return !!this.followedUsers[username]
  }

  findByCategory(query: string): void {
    this.postService.getPosts(query)
    .subscribe({
      next: res => {
        this.posts = res;
      },
      error: err => console.log(err)
    })
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

  isLikedPost(id: number): boolean {
    let isLiked: boolean = false;
    if (this.likedPosts.length != 0) {
      this.likedPosts.find(element => {
        if (element.post.id == id) {
          isLiked = true;
        }
      })
    }
    return isLiked;
  }

  giveLike(post: Post): void {
    const like = {
      post: {
        id: post.id
      },
      user: ''
    }

    this.likeService.giveLike(like)
      .subscribe({
        next: res => {
          this.ngOnInit();
        },
        error: err => console.log(err)
      })
  }

  removeLike(post: Post): void {
    this.likeService.removeLike(post.id)
      .subscribe({
        next: res => {
          this.ngOnInit();
        }
      })
  }
}
