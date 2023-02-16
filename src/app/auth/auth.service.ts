import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from './interface/token';
import { Observable, of, switchMap, catchError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.url}/isAuthenticated`)
    .pipe( switchMap(() => of(true)),
    catchError(() => {
      localStorage.removeItem('token');
      return of(false);
    }))
  }

  login(user: any): Observable<Token> {
    return this.http.post<Token>(`${this.url}/signin`, user, this.httpOptions);
  }
}
