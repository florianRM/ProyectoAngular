import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { VerifyComponent } from './auth/verify/verify.component';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  { 
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    pathMatch: 'full'
  },
  { 
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) 
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  { path: 'myposts', loadChildren: () => import('./myposts/myposts.module').then(m => m.MypostsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
