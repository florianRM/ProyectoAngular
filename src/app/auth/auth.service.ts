import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from './interface/token';
import { Observable, of, switchMap, catchError, BehaviorSubject } from 'rxjs';
import { LoginModel } from './interface/loginModel';
import { User } from './interface/user';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { ChatService } from '../services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private loggedIn = new BehaviorSubject<boolean> (false);

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private chatService: ChatService) { 
    this.http.get<any>(`${this.url}/isAuthenticated`)
    .subscribe({
      next: (res) => this.loggedIn.next(res.valid),
      error: (err: HttpErrorResponse) => {
        this.router.navigate(['/badgateway'])
        this.loggedIn.next(false)
      }
    })
  }

  get user() {
    const user = localStorage.getItem('user');
    if(user) {
      return JSON.parse(user);
    }
    return null;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  decodeToken(): void {
    try {
      const tokenSaved: string = localStorage.getItem('token') || '';
      let tokenPayload: JwtPayload = jwt_decode(tokenSaved);
      localStorage.setItem('user', JSON.stringify(tokenPayload));
    } catch (error) {
      console.log(error);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<any>(`${this.url}/isAuthenticated`)
    .pipe( switchMap((res) => {
      if(res.valid) {
        return of(true)
      } else {
        return of(false);
      }
    }))
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post<Token>(`${this.url}/signin`, user, this.httpOptions)
    .pipe( switchMap((res: Token) => {
      localStorage.setItem('token', res.token);
      this.decodeToken();
      this.loggedIn.next(true);
      this.router.navigate(['/']);
      return of(false);
    }),
    catchError((err) => {
      return of(true);
    }))
  };

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.chatService.disconnect();
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
