import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {

  myPosts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getMyposts()
    .subscribe({
      next: res => this.myPosts = res,
      error: err => console.log(err)
    })
  }

}
