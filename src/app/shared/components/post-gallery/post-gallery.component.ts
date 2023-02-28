import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/interfaces/post';
import { PopUpPostComponent } from '../pop-up-post/pop-up-post.component';

@Component({
  selector: 'app-post-gallery',
  templateUrl: './post-gallery.component.html',
  styleUrls: ['./post-gallery.component.css']
})
export class PostGalleryComponent implements OnInit {

  @Input() posts: Post[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(PopUpPostComponent, {
      maxWidth: '700px',
      maxHeight: '700px'
    });
    const instance = dialogRef.componentInstance;
    instance.post = post;
  }

}
