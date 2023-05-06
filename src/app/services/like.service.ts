import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Like } from 'src/interfaces/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  getLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(`${environment.url}/likes`);
  }

  giveLike(like: any): Observable<Like> {
    return this.http.post<Like>(`${environment.url}/like`, like);
  }

  removeLike(id: number): Observable<Like> {
    return this.http.delete<Like>(`${environment.url}/like/delete/${id}`);
  }
}
