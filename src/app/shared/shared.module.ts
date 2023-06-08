import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, RouterLink } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { LoadingComponent } from './loading/loading.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { ErrorComponent } from './error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { LikesUsersComponent } from './likes-users/likes-users.component';
import { LikesUsersDialogComponent } from './likes-users-dialog/likes-users-dialog.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    LoadingComponent,
    ErrorComponent,
    CommentsDialogComponent,
    LikesUsersComponent,
    LikesUsersDialogComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    TooltipModule,
    DynamicDialogModule,
    DialogModule
  ],
  exports: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    LoadingComponent,
    CommentsDialogComponent
  ],
  providers: [
    DialogService
  ]
})
export class SharedModule { }
