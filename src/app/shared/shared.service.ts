import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Follow } from '../../interfaces/follow';
import { FollowedPostService } from '../home/followed-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private url = environment.url;
  private _existPost = new BehaviorSubject<boolean> (false);
  private _user = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, 
            private followedPostService: FollowedPostService, 
            private router: Router, 
            private activatedRoute: ActivatedRoute,
            private userService: UserService
          ) {
    this.followedPostService.followedPosts(1)
    .subscribe({
      next: (res) => {
        if(res.content.length) {
          this._existPost.next(true);
        }
      }
    })
    this.userService.getUser()
    .subscribe({
      next: res => {
        this._user.next(res);
      },
      error: err => console.log(err)
    })
  }

  followedUser(follow: any): Observable<Follow> {
    return this.http.post<Follow>(`${this.url}/follows/followUser`, follow);
  }

  get existPost() {
    return this._existPost.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }

  refreshUser(): void {
    this.userService.getUser()
    .subscribe({
      next: res => {
        this._user.next(res)
      },
      error: err => console.log(err)
    })
  }

  refreshExistPosts(): void {
    this.followedPostService.followedPosts(1)
    .subscribe({
      next: (res) => {
        if(res.content.length) {
          this._existPost.next(true);
        } else {
          this._existPost.next(false);
          this.router.navigate(['/posts'], {relativeTo: this.activatedRoute})
        }
      }
    })
  }
}
