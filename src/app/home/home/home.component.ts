import { Component, OnInit } from '@angular/core';
import { FollowedPostService } from '../followed-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];

  constructor(private followedPost: FollowedPostService) { }

  ngOnInit(): void {
    this.followedPosts();
  }

  followedPosts(): void {
    this.followedPost.followedPosts()
    .subscribe({
      next: res => this.posts = res,
      error: err => console.log(err)
    })
  }

}
