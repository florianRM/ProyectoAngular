import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/interfaces/comment';

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
  postId: number = 0;

  constructor(private fb: FormBuilder, private commentService: CommentService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) { 
    this.postId = config.data.id
  }
  
  ngOnInit(): void {
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
      next: res => {
        this.myForm.reset();
        this.ngOnInit();
      }
    })
  }
}
