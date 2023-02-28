import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/interfaces/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MypostService {

  private url: string = environment.postsUrl;

  constructor(private http: HttpClient) { }

  getMyposts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/myposts`);
  }
}
