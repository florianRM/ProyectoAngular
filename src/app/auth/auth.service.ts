import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from './interface/token';
import { Observable, of, switchMap, catchError, BehaviorSubject } from 'rxjs';
import { LoginModel } from './interface/loginModel';
import { User } from './interface/user';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private loggedIn = new BehaviorSubject<boolean> (false);

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router) { 
    this.http.get(`http://localhost:8080/isAuthenticated`)
    .subscribe({
      next: () => this.loggedIn.next(true),
      error: () => this.loggedIn.next(false)
    })
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`http://localhost:8080/isAuthenticated`)
    .pipe( switchMap(() => of(true)),
    catchError((err) => {
      console.log(err);
      return of(false);
    }))
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post<Token>(`${this.url}/signin`, user, this.httpOptions)
    .pipe( switchMap((res: Token) => {
      localStorage.setItem('token', res.token);
      this.loggedIn.next(true);
      this.router.navigate(['/']);
      return of(false);
    }),
    catchError((err) => {
      console.log(err);
      return of(true);
    }))
  };

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user, this.httpOptions);
  }

  verify(): Observable<any> {
    return this.route.queryParams
    .pipe( switchMap((res) => {
      return this.http.get(`${this.url}/verify?user=${res['user']}&code=${res['code']}`);
    }))
  }
}
