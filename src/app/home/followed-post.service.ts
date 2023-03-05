import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FollowedPostService {

  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  followedPosts(): Observable<any> {
    return this.http.get(`${this.url}/posts/followed`);
  }
}
