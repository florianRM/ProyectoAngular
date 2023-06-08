import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Like } from 'src/interfaces/like';

@Component({
  selector: 'app-likes-users-dialog',
  templateUrl: './likes-users-dialog.component.html'
})
export class LikesUsersDialogComponent implements OnInit {

  userLiked: Like[] = [];

  constructor(private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.userLiked = this.config.data.likes
  }

}
