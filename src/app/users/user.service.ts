import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../auth/interface/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url}/users`);
  }

  enabledUser(id: string, enabled: boolean): Observable<any> {
    const user = {enabled}
    return this.http.put(`${environment.url}/user/${id}/status`, user);
  }
}
