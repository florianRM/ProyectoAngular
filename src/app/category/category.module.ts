import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategoryModule { }
