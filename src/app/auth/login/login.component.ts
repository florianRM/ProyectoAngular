import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;
  loginCredential: any = {
    username: '',
    password: ''
  }
  incorrectLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login():void {
    this.authService.login(this.myForm.value)
    .subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
      },
      error: err => {
        if(err.status === 401) {
          this.loginCredential = {username: '', password: ''};
          this.incorrectLogin = true;
        }
      }
    });
  }

}
