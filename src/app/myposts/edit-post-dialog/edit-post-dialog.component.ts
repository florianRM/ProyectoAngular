import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/interfaces/post';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent implements OnInit {

  post: Post;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private config: DynamicDialogConfig, private postService: PostService, private dynamicDialogRef: DynamicDialogRef) {
    this.post = config.data.post;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      description: [`${this.post.description}`]
    })
  }

  isValidField(name: string): boolean {
    return this.myForm.controls[name].invalid && this.myForm.controls[name].touched;
  }

  save(): void {
    if(this.myForm.invalid) {
      return;
    }

    const formData = this.myForm.value;
    this.postService.editPost(this.post.id, formData)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The post was edited correctly'
        })
        .then((res) => {
          if(res.isConfirmed) {
            this.closeDialog();
          }
        })
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'An error ocurred',
          text: err.error.message
        });
      }
    })
  }

  closeDialog(): void {
    this.dynamicDialogRef.close();
  }

}
