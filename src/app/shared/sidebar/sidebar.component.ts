import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/interface/user';
import { FollowedPostService } from 'src/app/home/followed-post.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user!: User;
  _existPosts: boolean = true;
  open: boolean = false;
  @Output()
  openSidebar: EventEmitter<boolean> = new EventEmitter();
  refDialog!: DynamicDialogRef;

  constructor(private authService: AuthService, private userService: UserService, private followedPostService: FollowedPostService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.userInfo();
    this.existPosts();
  }

  openEditUser(): void {
    this.refDialog = this.dialogService.open(EditUserDialogComponent, {
      header: 'Update Profile',
      closable: false,
    });

    this.refDialog.onClose
    .subscribe(() => {
      this.ngOnInit();
    })
  }

  userInfo(): void {
    this.userService.getUser()
    .subscribe({
      next: res => {
        this.user = res;
      },
      error: err => console.log(err)
    })
  }

  existPosts(): void {
    this.followedPostService.followedPosts()
    .subscribe({
      next: (res) => {
        if(!res.totalElements) {
          this._existPosts = false
        }
      }
    })
  }

  isMobile(): boolean {
    if(window.screen.width < 480) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
  }

  changeStateSideBar(): void {
    this.open = !this.open;
    this.openSidebar.emit(this.open);
  }
}
