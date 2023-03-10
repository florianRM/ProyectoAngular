import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/interfaces/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(query?: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.url}/${query ? 'posts?keyword='+query : 'posts'}`);
  }
}
