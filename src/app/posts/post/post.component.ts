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
import { DialogService } from 'primeng/dynamicdialog';
import { LikesUsersDialogComponent } from 'src/app/shared/likes-users-dialog/likes-users-dialog.component';
import { CommentsDialogComponent } from 'src/app/shared/comments-dialog/comments-dialog.component';
import { Follow } from 'src/interfaces/follow';

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

  constructor(private dialogService: DialogService, private postService: PostService, private authService: AuthService, private followService: FollowService, private likeService: LikeService, private router: Router) { }

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
      width: "30vw",
      data: {
        id: postId
      },
      baseZIndex: 10000,
      modal: true
    })
  }

  openLikesDialog(post: Post): void {
    this.dialogService.open(LikesUsersDialogComponent, {
      header: 'Likes',
      data: post,
      modal: true,
      width: '20vw'
    });
  }

  getFollows(): void {
    this.followService.getFollowed()
    .subscribe({
      next: (res: Follow[]) => {
        this.follows = res;
      }
    })
  }

  isFollowed(username: string): boolean {
    for(let i=0; i < this.follows.length; i++) {
      if(this.follows[i].followed === username) {
        return true;
      }
    }
    return false;
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
      next: res => location.reload()
    })

  }

  unfollowUser(followed: string): void {
    this.followService.unfollowUser(followed)
    .subscribe({
      next: () => location.reload()
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
