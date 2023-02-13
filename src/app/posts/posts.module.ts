import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  exports: [
    PostComponent
  ]
})
export class PostsModule { }
