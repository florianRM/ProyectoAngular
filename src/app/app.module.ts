import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { RouterLink } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    PostsModule,
    HomeModule,
    RouterLink,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
