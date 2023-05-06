import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isLogued!: boolean;
  open: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn
    .subscribe({
      next: res => {
        this.isLogued = res
      },
      error: err => console.log('Hola')
    })
  }

  changeStateSideBar(): void {
    this.open = !this.open;
  }

  title = 'ProyectoAngular';
}
