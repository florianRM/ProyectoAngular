import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/interfaces/post';
import { PopUpPostComponent } from '../pop-up-post/pop-up-post.component';

@Component({
  selector: 'app-post-gallery',
  templateUrl: './post-gallery.component.html',
  styleUrls: ['./post-gallery.component.css'],
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
export class PostGalleryComponent implements OnInit {

  @Input() posts: Post[] = [];
  @Input() postsLength: number = 0;
  state: string[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    for(let i=0; i < this.postsLength; i++) {
      this.state.push('close');
    }
  }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(PopUpPostComponent, {
      maxWidth: '700px',
      maxHeight: '700px'
    });
    const instance = dialogRef.componentInstance;
    instance.post = post;
  }

  changeState(index: number) {
    this.state[index] = this.state[index]  === 'close' ? 'open' : 'close';
  }

}
