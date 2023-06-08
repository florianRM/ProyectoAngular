import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/interfaces/post';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MypostService {

  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  getMyposts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/myposts`);
  }

  uploadPost(postInfo: any, file: File): Observable<Post> {
    const form: FormData = new FormData();
    form.append('file', file, file.name);
    form.append('post', new Blob([JSON.stringify(postInfo)], {type: 'application/json'}));
    return this.http.post<Post>(`${this.url}/posts/upload`, form);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.url}/post/delete/${id}`)
  }

}
