import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypostsRoutingModule } from './myposts-routing.module';
import { MypostComponent } from './mypost/mypost.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MypostComponent
  ],
  imports: [
    CommonModule,
    MypostsRoutingModule,
    SharedModule
  ]
})
export class MypostsModule { }
