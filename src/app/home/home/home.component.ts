import { Component, OnInit } from '@angular/core';
import { FollowedPostService } from '../followed-post.service';
import {  } from "ngx-infinite-scroll"
import { Router } from '@angular/router';
import { LikeService } from 'src/app/services/like.service';
import { Like } from 'src/interfaces/like';
import { Post } from 'src/interfaces/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/interfaces/comment';

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

  constructor(private commentService: CommentService, private fb: FormBuilder, private followedPost: FollowedPostService, private likeService: LikeService, private router: Router) { }

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
    this.postId = postId;
    this.visibleComments = !this.visibleComments;
  }

  getComments(id: number): void {
    this.commentService.getCommentsByPostId(id)
    .subscribe({
      next: res => this.comments = res
    })
  }

  openCommentsDialog(): void {
    this.visibleComments = !this.visibleComments;
  }

  commentPost(): void {
    if(this.myForm.invalid) {
      return;
    }

    const comment = {
      post: {
        id: this.postId
      },
      commentContain: this.myForm.controls['comment'].value
    }

    this.commentService.addComment(comment)
    .subscribe({
      next: res => {
        this.myForm.reset();
        this.getComments(this.postId)
      }
    })
  }

}
