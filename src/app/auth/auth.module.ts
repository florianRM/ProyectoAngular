import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterLink,
    HttpClientModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
