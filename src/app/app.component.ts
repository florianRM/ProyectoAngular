import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogued: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.isAuthenticated()
    // .subscribe({
    //   next: res => {
    //     this.isLogued = res
    //   }
    // })
  }

  title = 'ProyectoAngular';
}
