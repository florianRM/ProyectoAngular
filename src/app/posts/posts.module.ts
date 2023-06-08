import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    DynamicDialogModule,
    TooltipModule
  ],
  exports: [
    PostComponent
  ]
})
export class PostsModule { }
