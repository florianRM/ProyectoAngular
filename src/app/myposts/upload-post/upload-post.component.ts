import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from 'src/app/services/post.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    description: [''],
    img: ['', Validators.required],
    categories: this.fb.array([], Validators.required),
    fileSource: ['']
  })
  newCategory: FormControl = this.fb.control('', Validators.required);
  categoriesForm: any[] = [];
  addedCategories: any[] = [];
  mimeTypesAllowed: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp'];

  json: any = {
    title: '',
    description: '',
    category: []
  }

  constructor(private categoryService: CategoryService, private dynamicDialogRef: DynamicDialogRef, private fb: FormBuilder, private postService: PostService, private router: Router) { }

  uploaded: boolean = false;
  file!: File | null;

  ngOnInit(): void {
    this.categoryService.getCategories()
    .subscribe({
      next: res => this.categoriesForm = res
    })
  }

  get categories() {
    return this.myForm.get('categories') as FormArray;
  }

  addCategory(event: any): void {
    let text = event.target.options[event.target.options.selectedIndex].text;
    if(!this.addedCategories.includes(text)) {
      this.addedCategories.push(text);
      this.categories.push(this.fb.control(this.newCategory.value, Validators.required))
    }
    this.newCategory.reset();
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    if(this.file != null && this.file != undefined) {
      if(this.file!.size > 1048576) {
        Swal.fire({
          icon: 'error',
          title: 'Wow, an error has occurred',
          text: 'Images larger than 1 mb are not allowed'
        })
        this.file = null;
      } else if(!this.mimeTypesAllowed.includes(this.file?.type!)) {
        Swal.fire({
          icon: 'error',
          title: 'Wow, an error has occurred',
          text: 'The mimetype are not allowed'
        })
        this.file = null;
      } else {
        this.myForm.patchValue({
          fileSource: this.file
        })
        this.uploaded = true;
      }
    }
  }

  isValidField(name: string): boolean {
    return this.myForm.controls[name].invalid && this.myForm.controls[name].touched;
  }

  closeDialog(): void {
    this.dynamicDialogRef.close();
  }

  uploadPost(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.json.title = this.myForm.get('title')?.value;
    this.json.description = this.myForm.get('description')?.value;
    const categories = this.myForm.get('categories')?.value;
    for(let i=0; i < categories.length; i++) {
      this.json.category.push({id: categories[i]})
    }
    
    const file: File = this.myForm.get('fileSource')?.value;

    this.postService.uploadPost(this.json, file)
    .subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Successful Upload',
          text: `Image has been uploaded`,
          showConfirmButton: true
        }).then(resp => {
          if(resp.isConfirmed) {
            this.closeDialog();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/myposts']);
            });
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 500) {
          
        }
      }
    });
  }

}
