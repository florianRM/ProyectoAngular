import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { MypostService } from '../mypost.service';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {

  myPosts: Post[] = [];

  constructor(private myPostService: MypostService) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts(): void {
    this.myPostService.getMyposts()
    .subscribe({
      next: res => this.myPosts = res
    })
  }

}
