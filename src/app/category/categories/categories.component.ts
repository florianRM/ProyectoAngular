import { Component, OnInit } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/interface/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];
  totalRecords: number = 0;
  display: boolean = false;
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  })
  user!: User;
  cols: any[] = [];

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.categoryService.getCategories()
    .subscribe({
      next: res => {
        this.totalRecords = res.length;
        this.categories = res;
      }
    })
  }

  changeDisplay(): void {
    this.display = !this.display;
  }

  isValidName() {
    return this.myForm.controls['name'].invalid && this.myForm.controls['name'].touched;
  }

  addCategory(): void {
    this.display = false;
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.categoryService.addCategory(this.myForm.value)
    .subscribe({
      next: () => {
        Swal.fire({
          title: 'Successfully',
          text: 'The category has been added successfully',
          showCancelButton: true,
          showConfirmButton: false
        })
        this.ngOnInit();
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error ocurred',
          text: err.error.message,
          showCancelButton: true,
          showConfirmButton: false
        })
      }
    })
  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Delete category',
      icon: 'warning',
      text: 'Are you sure to delete this category?',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red'
    }).then(resp => {
      if(resp.isConfirmed) {
        this.categoryService.deleteCategory(id)
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'Successfully',
              text: 'The category has been deleted successfully',
              showCancelButton: true,
              showConfirmButton: false
            })
            this.ngOnInit();
          }
        })
      }
    })
  }

}
