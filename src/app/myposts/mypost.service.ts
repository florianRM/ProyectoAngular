import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/interfaces/post';
import { environment } from '../../environments/environment';
import { UploadPost } from '../../interfaces/uploadPost';

@Injectable({
  providedIn: 'root'
})
export class MypostService {

  private url: string = environment.postsUrl;

  constructor(private http: HttpClient) { }

  getMyposts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/myposts`);
  }

  uploadPost(postInfo: any, file: File): Observable<File> {
    const form: FormData = new FormData();
    form.append('file', file, file.name);
    form.append('post', new Blob([JSON.stringify(postInfo)], {type: 'application/json'}));
    return this.http.post<File>(`${this.url}/upload`, form);
  }
}
