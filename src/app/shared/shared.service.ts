import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../auth/interface/user';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Follow } from '../auth/interface/follow';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(): Observable<User> {
    const user: JwtPayload = this.authService.decodeToken();
    return this.http.get<User>(`${this.url}/user/${user.sub}`);
  }

  followedUser(follow: any): Observable<Follow> {
    return this.http.post<Follow>(`${this.url}/follows/followUser`, follow);
  }
}
