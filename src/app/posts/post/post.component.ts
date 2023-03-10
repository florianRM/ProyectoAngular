import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interface/user';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../auth/auth.service';
import { JwtPayload } from 'jwt-decode';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('visibleIcons', [
      state('open', style({
        transform: 'translateY(0px)'
      })),
      state('close', style({
        transform: 'translateY(-40px)'
      })),
      transition('open<=>close', animate('150ms'))
    ])
  ]
})
export class PostComponent implements OnInit {

  state: string[] = [];
  posts!: Post[];
  userInfo!: JwtPayload;

  constructor(private postService: PostService, private authService: AuthService, private followService: FollowService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.user;
    this.postService.getPosts()
    .subscribe({
      next: res => {
        this.posts = res;
        for(let i=0; i < res.length; i++) {
          this.state.push('close');
        }
      },
      error: err => console.log(err)
    })
  }

  findByCategory(query: string): void {
    this.postService.getPosts(query)
    .subscribe({
      next: res => {
        this.posts = res;
        for(let i=0; i < res.length; i++) {
          this.state.push('close');
        }
      },
      error: err => console.log(err)
    })
  }

  followUser(followed: string): void {
    const user: string = this.authService.user.sub;
    this.followService.followUser(user, followed)
    .subscribe({
      next: res => this.ngOnInit()
    })

  }

  changeState(index: number) {
    this.state[index] = this.state[index]  === 'close' ? 'open' : 'close';
  }

}
