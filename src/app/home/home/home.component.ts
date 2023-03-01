import { Component, OnInit } from '@angular/core';
import { FollowedPostService } from '../followed-post.service';
import {  } from "ngx-infinite-scroll"
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];

  constructor(private followedPost: FollowedPostService, private router: Router) { }

  ngOnInit(): void {
    this.followedPosts();
  }

  followedPosts(): void {
    this.followedPost.followedPosts()
    .subscribe({
      next: res => {
        this.posts = res.content;
        if(!res.content.length) {
          this.router .navigate(['/posts'])
        }
      },
      error: err => console.log(err)
    })
  }

}
