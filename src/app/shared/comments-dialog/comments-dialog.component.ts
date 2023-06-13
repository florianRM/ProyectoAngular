import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Comment } from 'src/interfaces/comment';
import { Post } from 'src/interfaces/post';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.css']
})
export class CommentsDialogComponent implements OnInit {
  comments: Comment[] = [];
  myForm: FormGroup = this.fb.group({
    comment: ['', [Validators.required, Validators.maxLength(500)]]
  })
  editCommentForm!: FormGroup;
  postId: number = 0;
  post!: Post;
  openDescription: boolean = false;
  actualUser: string = '';
  commentsMap: { [comment: string]: boolean } = {};
  commentId!: number;
  visible: boolean = false;
  commentContain: string = '';

  constructor(private fb: FormBuilder, private commentService: CommentService, config: DynamicDialogConfig, private postService: PostService, authService: AuthService) {
    this.postId = config.data.id;
    this.actualUser = authService.user.sub;
  }

  ngOnInit(): void {
    this.postService.getPost(this.postId)
    .subscribe({
      next: res => {
        this.post = res
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'An error ocurred',
          text: err.error.message
        })
      }
    })
    this.getComments();
    this.editCommentForm = this.fb.group({
      comment: [this.commentContain, [Validators.required, Validators.maxLength(500)]]
    })
  }

  changeVisible(commentId: number, commentContain: string): void {
    this.visible = !this.visible;
    this.commentId = commentId;
    this.commentContain = commentContain;
    this.editCommentForm.patchValue({comment: this.commentContain})
  }

  changeDescriptionStatus(): void {
    this.openDescription = !this.openDescription;
  }

  getComments(): void {
    this.commentService.getCommentsByPostId(this.postId)
    .subscribe({
      next: res => this.comments = res
    })
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
      next: () => {
        this.myForm.reset();
        this.getComments();
      }
    })
  }

  editComment(): void {

  }

  deleteComment(id: number): void {
    Swal.fire({
      title: 'Delete post',
      icon: 'warning',
      text: 'Are you sure to delete this comment?',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red'
    }).then(resp => {
      if (resp.isConfirmed) {
        this.commentService.deleteComment(id)
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'Successfully',
              text: 'The comment has been deleted successfully',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Cancel',
              confirmButtonColor: 'gray'
            })
            .then((res) => {
              if(res.isConfirmed) {
                this.getComments();
              }
            })
          }
        })
      }
    })
  }
}
