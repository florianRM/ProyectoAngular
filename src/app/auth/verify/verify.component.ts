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
      next: (res: Observable<any>) => {
        res.subscribe({
          next: res => console.log(res)
        })
        Swal.fire({
          icon: 'success',
          title: 'Account was verified',
          showConfirmButton: false,
          allowOutsideClick: false
        })
      }
    })
  }

}
