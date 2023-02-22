import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    
    return this.authService.isAuthenticated()
    .pipe( switchMap((res) => {
      if(res) {
        this.router.navigate(['/']);
        return of(true);
      } else {
        this.router.navigate(['/login'])
        return of(false)
      }
    }))
  }
  
}
