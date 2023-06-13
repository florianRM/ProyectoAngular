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

  getMyposts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.url}/myposts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.url}/post/${id}`);
  }

  uploadPost(postInfo: any, file: File): Observable<Post> {
    const form: FormData = new FormData();
    form.append('file', file, file.name);
    form.append('post', new Blob([JSON.stringify(postInfo)], {type: 'application/json'}));
    return this.http.post<Post>(`${environment.url}/posts/upload`, form);
  }

  editPost(id: number, post: any): Observable<Post> {
    return this.http.put<Post>(`${environment.url}/post/edit/${id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${environment.url}/post/delete/${id}`)
  }
}
