import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.verify()
    .subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: res.msg,
          showConfirmButton: false,
          allowOutsideClick: false
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message ? err.error.message : 'Unexpected error',
          showConfirmButton: false,
          allowOutsideClick: false
        })
      }
    })
  }

}
