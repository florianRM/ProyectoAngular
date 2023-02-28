import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../auth/interface/user';
import { environment } from '../../environments/environment';
import { Follow } from '../auth/interface/follow';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private url = environment.usersUrl;
  private followsUrl = environment.followsUrl;
  private tokenSaved: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(): Observable<User> {
    const user: JwtPayload = this.authService.decodeToken();
    return this.http.get<User>(`${this.url}/${user.sub}`);
  }

  followedUser(follow: any): Observable<Follow> {
    return this.http.post<Follow>(this.followsUrl, follow);
  }
}
