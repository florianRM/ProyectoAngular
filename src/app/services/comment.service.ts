import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comment } from 'src/interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url}/comments/${id}`);
  }

  addComment(comment: any): Observable<Comment> {
    return this.http.post<Comment>(`${environment.url}/comment/add`, comment);
  }
}
