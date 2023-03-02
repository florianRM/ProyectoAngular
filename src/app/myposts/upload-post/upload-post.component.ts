import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MypostService } from '../mypost.service';
import { UploadPost } from '../../../interfaces/uploadPost';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    img: ['', Validators.required],
    fileSource: ['']
  })

  json: any = {
    title: '',
    description: ''
  }

  constructor(private fb: FormBuilder, private dialog: MatDialogRef<UploadPostComponent>, private myPostService: MypostService) { }

  uploaded: boolean = false;
  file!: File | null;

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    this.myForm.patchValue({
      fileSource: this.file
    })
    this.uploaded = true;
  }

  closeModal(): void {
    this.dialog.close();
  }

  uploadPost(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }

    this.json.title = this.myForm.get('title')?.value;
    this.json.description = this.myForm.get('description')?.value;
    
    const file: File = this.myForm.get('fileSource')?.value;
    this.myPostService.uploadPost(this.json, file)
    .subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful Upload',
          text: `Image with name ${res.name} has been uploaded`,
          showConfirmButton: true
        }).then(resp => {
          if(resp.isConfirmed) {
            this.closeModal();
          }
        })
      },
      error: err => console.log(err)
    });

  }

}
