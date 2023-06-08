import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated()
    .pipe( switchMap(res => {
      if(res) {
        this.router.navigate(['/']);
          return of(false);
      } else {
        return of(true);
      }
    }))
  }
  
}
