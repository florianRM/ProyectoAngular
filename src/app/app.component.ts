import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isLogued!: boolean;
  open: boolean = false;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn
    .subscribe({
      next: res => {
        this.isLogued = res
        if(res === true) {
          try {
            this.chatService.connect();
          } catch (error) {
            console.log(error)
          }
        }
      },
      error: err => console.log('Hola')
    });
  }

  openSidebar(event: boolean): void {
    this.open = event;
  }

  title = 'ProyectoAngular';
}
