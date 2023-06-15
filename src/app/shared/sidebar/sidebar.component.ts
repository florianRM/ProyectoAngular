import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/interface/user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user!: User;
  _existPosts: boolean = true;
  open: boolean = false;
  @Output()
  openSidebar: EventEmitter<boolean> = new EventEmitter();
  refDialog!: DynamicDialogRef;
  existPostSubscription!: Subscription;

  constructor(private authService: AuthService, private sharedService: SharedService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.userInfo();
    this.sharedService.refreshUser();
    this.existPostSubscription = this.sharedService.existPost
    .subscribe({
      next: res => this._existPosts = res
    })
  }

  ngOnDestroy(): void {
    this.existPostSubscription.unsubscribe();
  }

  openEditUser(): void {
    this.refDialog = this.dialogService.open(EditUserDialogComponent, {
      header: 'Update Profile',
      closable: false,
      modal: true
    });
  }

  userInfo(): void {
    this.sharedService.user
    .subscribe({
      next: res => {
        this.user = res;
      },
      error: err => console.log(err)
    })
  }

  logout(): void {
    this.openSidebar.emit(false);
    this.authService.logout();
  }

  changeStateSideBar(): void {
    this.open = !this.open;
    this.openSidebar.emit(this.open);
  }
}
