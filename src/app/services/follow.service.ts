import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  followUser(user: string, followed: string): Observable<any> {
    const body = {user: {username: user}, followed: {username: followed}};
    return this.http.post(`${environment.url}/follows/followUser`, body)
  }
}
