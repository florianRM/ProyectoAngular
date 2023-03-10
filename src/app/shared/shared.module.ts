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



@NgModule({
  declarations: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SidebarComponent,
    SearchBarComponent,
    FooterComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
