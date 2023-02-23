import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowedPostService {

  private url: string = 'http://localhost:8080/posts';

  constructor(private http: HttpClient) { }

  followedPosts(): Observable<any> {
    return this.http.get(`${this.url}/followed`);
  }
}
