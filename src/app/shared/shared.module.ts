import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, RouterLink } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PostGalleryComponent } from './components/post-gallery/post-gallery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpPostComponent } from './components/pop-up-post/pop-up-post.component'


@NgModule({
  declarations: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    PostGalleryComponent,
    PopUpPostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatDialogModule
  ],
  exports: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    PostGalleryComponent
  ]
})
export class SharedModule { }
