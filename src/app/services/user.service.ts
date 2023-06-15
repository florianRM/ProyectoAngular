import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../auth/interface/user';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url}/users`);
  }

  enabledUser(id: string, enabled: boolean): Observable<any> {
    const user = {enabled}
    return this.http.put(`${environment.url}/user/${id}/status`, user);
  }

  getUser(): Observable<User> {
    const user = this.authService.user;
    return this.http.get<User>(`${environment.url}/user/${user.sub}`);
  }

  updateUser(username: string, userUpdated: any, file: File): Observable<User> {
    const form: FormData = new FormData();
    if(file) {
      form.append('file', file, file.name);
    }
    form.append('user', new Blob([JSON.stringify(userUpdated)], {type: 'application/json'}));
    return this.http.put<User>(`${environment.url}/user/edit/${username}`, form);
  }
}
