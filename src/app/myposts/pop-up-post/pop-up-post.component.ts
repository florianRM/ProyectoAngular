import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { Post } from 'src/interfaces/post';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pop-up-post',
  templateUrl: './pop-up-post.component.html',
  styleUrls: ['./pop-up-post.component.css']
})
export class PopUpPostComponent implements OnInit {

  @Input() post!: Post;

  constructor(private dialogRef: MatDialogRef<PopUpPostComponent>, private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // follow(): void {
  //   const user: JwtPayload = this.authService.decodeToken();
  //   const follow = {
  //     user: user.sub,
  //     followed: this.post.user
  //   }
  //   this.sharedService.followedUser(follow)
  //   .subscribe({
  //     next: res => console.log(res),
  //     error: err => console.log(err)
  //   })
  // }

}
