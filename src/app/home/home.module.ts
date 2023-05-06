import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    DialogModule,
    TooltipModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
