import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/interfaces/post';
import { UploadPostComponent } from '../upload-post/upload-post.component';
import { MypostService } from '../mypost.service';
import Swal from 'sweetalert2';

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

  constructor(private dialog: MatDialog, private myPostService: MypostService) { }

  ngOnInit(): void {
    for(let i=0; i < this.postsLength; i++) {
      this.state.push('close');
    }
  }

  openDialogUpload(): void {
    this.dialog.open(UploadPostComponent, {
      disableClose: true
    });
  }

  changeState(index: number) {
    this.state[index] = this.state[index]  === 'close' ? 'open' : 'close';
  }

  deletePost(id: number): void {
    this.myPostService.deletePost(id)
    .subscribe({
      next: () => {
        Swal.fire({
          title: 'Delete post',
          icon: 'warning',
          text: 'Are you sure to delete this post?',
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonText: 'Delete',
          confirmButtonColor: 'red'
        }).then(resp => {
          if(resp.isConfirmed) {
            Swal.fire({
              title: 'Successfully',
              text: 'The post has been deleted successfully',
              showCancelButton: true,
              showConfirmButton: false
            })
          }
        })
      } 
    })
  }

}
