import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
    repeatPass: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    conditions: [false, Validators.requiredTrue]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isValid(field: string): boolean {
    return this.myForm.controls[field].invalid && this.myForm.controls[field].touched;
  }

  isSamePassword(): boolean {
    return (this.myForm.controls['password'].value != this.myForm.controls['repeatPass'].value) && this.myForm.controls['repeatPass'].touched;
  }

  withOutSurname(): boolean {
    return this.myForm.controls['withoutSurname'].value;
  }

  save(): void {
    this.authService.register(this.myForm.value)
    .subscribe({
      next: ({name}) => {
        Swal.fire({
          icon: 'info',
          title: `One more step ${name}`,
          text: 'Please check your email to confirm the account!',
        }).then(result => {
          if(result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })
      }
    });
  }

}
