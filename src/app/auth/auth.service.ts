import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from './interface/token';
import { Observable, of, switchMap, catchError } from 'rxjs';
import { LoginModel } from './interface/loginModel';
import { User } from './interface/user';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  isAuthenticated(): Observable<any> {
    return this.http.get(`http://localhost:8080/isAuthenticated`)
    .pipe( switchMap(() => of(true)),
    catchError((err) => {
      console.log(err);
      return of(false);
    }))
  }

  login(user: LoginModel): Observable<Token> {
    return this.http.post<Token>(`${this.url}/signin`, user, this.httpOptions);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user, this.httpOptions);
  }

  verify(): Observable<any> {
    return this.route.queryParams
    .pipe( switchMap((res) => {
      return of(this.http.get(`${this.url}/verify?user=${res['user']}&code=${res['code']}`));
    }))
  }
}
