import { Component, OnInit } from '@angular/core';
import { FollowedPostService } from '../followed-post.service';
import { Router } from '@angular/router';
import { LikeService } from 'src/app/services/like.service';
import { Like } from 'src/interfaces/like';
import { Post } from 'src/interfaces/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/interfaces/comment';
import { CommentsDialogComponent } from 'src/app/shared/comments-dialog/comments-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FollowService } from 'src/app/services/follow.service';
import { SharedService } from 'src/app/shared/shared.service';
import { LikesUsersDialogComponent } from 'src/app/shared/likes-users-dialog/likes-users-dialog.component';
import { Follow } from 'src/interfaces/follow';
import { Subscription } from 'rxjs';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];
  likedPosts: Like[] = [];
  visibleComments: boolean = false;
  comments: Comment[] = [];
  myForm: FormGroup = this.fb.group({
    comment: ['', [Validators.required, Validators.maxLength(500)]]
  })
  follows: Follow[] = [];
  followedUsers: { [username: string]: boolean } = {};
  postId: number = 0;
  likesDialogRef!: DynamicDialogRef;
  followsSubscription!: Subscription;
  actualPage: number = 1;
  isLast: boolean = false;

  constructor(private dialogService: DialogService,
            private fb: FormBuilder, 
            private followedPost: FollowedPostService, 
            private likeService: LikeService, 
            private router: Router, 
            private followService: FollowService,
            private sharedService: SharedService) { }

  ngOnInit(): void {
    this.likeService.getLikes()
      .subscribe({
        next: res => this.likedPosts = res,
        error: err => this.router.navigate(['/error'])
      })
    this.followedPosts();
    this.getFollows();
  }

  openLikesDialog(post: Post): void {
    this.likesDialogRef = this.dialogService.open(LikesUsersDialogComponent, {
      header: 'Likes',
      data: {
        post,
        followedUsers: this.followedUsers
      }
    });

    this.likesDialogRef.onClose
    .subscribe({
      next: () => this.getFollows()
    })
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

  onScrolled(event: any): void {
    if(!this.isLast) {
      ++this.actualPage;
      this.followedPost.followedPosts(this.actualPage)
      .subscribe({
        next: res => {
          this.isLast = res.last;
          this.posts.push(...res.content);
        }
      })
    }
  }

  followedPosts(): void {
    this.followedPost.followedPosts(this.actualPage)
    .subscribe({
      next: res => {
        this.posts = res.content;
        if(!res.content.length) {
          this.router.navigate(['/posts'])
        }
      },
      error: err => console.log(err)
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

  openCommentDialog(postId: number): void {
    this.dialogService.open(CommentsDialogComponent, {
      header: "Comments",
      data: {
        id: postId
      },
      baseZIndex: 99999999,
      modal: true
    })
  }

  unfollowUser(followed: string): void {
    this.followService.unfollowUser(followed)
    .subscribe({
      next: () => {
        this.followedPosts();
        this.sharedService.refreshExistPosts();
        this.sharedService.refreshUser();
      }
    })
  }

}
