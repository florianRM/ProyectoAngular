import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, RouterLink } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorComponent } from './error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    LoadingComponent,
    ErrorComponent,
    CommentsDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    DialogModule,
    TooltipModule
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
