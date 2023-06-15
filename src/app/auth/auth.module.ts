import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { RouterLink, RouterModule } from '@angular/router';
import { VerifyComponent } from './verify/verify.component'
import { ChatService } from '../services/chat.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
