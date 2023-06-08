import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated()
      .pipe(switchMap(res => {
        if (res) {
          return of(true)
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      }))
  }
}
