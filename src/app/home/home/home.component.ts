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
import { DialogService } from 'primeng/dynamicdialog';
import { FollowService } from 'src/app/services/follow.service';

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
  postId: number = 0;

  constructor(private dialogService: DialogService, private fb: FormBuilder, private followedPost: FollowedPostService, private likeService: LikeService, private router: Router, private followService: FollowService) { }

  ngOnInit(): void {
    this.likeService.getLikes()
      .subscribe({
        next: res => this.likedPosts = res,
        error: err => this.router.navigate(['/error'])
      })
    this.followedPosts();
  }

  followedPosts(): void {
    this.followedPost.followedPosts()
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
      width: "30vw",
      data: {
        id: postId
      },
      baseZIndex: 10000,
      modal: true
    })
  }

  unfollowUser(followed: string): void {
    this.followService.unfollowUser(followed)
    .subscribe({
      next: () => location.reload()
    })
  }

}
