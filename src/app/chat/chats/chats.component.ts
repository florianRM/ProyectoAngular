import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Follow } from 'src/interfaces/follow';
import { ChatService } from 'src/app/services/chat.service';
import { FollowService } from 'src/app/services/follow.service';
import { Chat, CreateChat, CreateGroup } from 'src/interfaces/chat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {
  chats: Chat[] = [];
  username: string;
  chat!: Chat;
  statusSubscription!: Subscription;
  usersOnline: any[] = [];
  visible: boolean = false;
  followList: Follow[] = [];
  groupVisible: boolean = false;
  groupName: string = '';
  isRouterOutletActivated: boolean = false;
  existChats: string[] = [];
  _missingFollowers: string[] = [];
  closeChats: boolean = false;

  constructor(private chatService: ChatService,
    authService: AuthService,
    private followService: FollowService,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef) {
    this.username = authService.user.sub;
  }

  ngOnInit(): void {
    this.getFollowed();
    this.statusSubscription = this.chatService.suscribeToCheckStatus().subscribe((message: IMessage) => {
      const usersOnlineList: string[] = JSON.parse(message.body);
      this.usersOnline = usersOnlineList;
    }
    )
    this.chatService.checkConnection();
    this.getChats();
    this.isCloseChats();
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  changeToCloseChat(): void {
    this.chatService.changeToCloseChat();
  }

  isCloseChats(): void {
    this.chatService.isCloseChats
      .subscribe({
        next: res => {
          this.closeChats = res;
        }
      })
  }

  onRouterOutletActivate() {
    this.ngZone.run(() => {
      this.isRouterOutletActivated = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  onRouterOutletDeactivate() {
    this.ngZone.run(() => {
      this.isRouterOutletActivated = false;
      this.changeDetectorRef.detectChanges();
      this.ngOnInit();
    });
  }

  openDialog(): void {
    this.visible = !this.visible;
  }

  openGroupDialog(): void {
    this.groupVisible = !this.groupVisible;
  }

  getChats(): void {
    this.chatService.getChatsForUser()
      .subscribe((res: Chat[]) => {
        this.chats = res;
        this.missingFollowers();
      })
  }

  missingFollowers(): void {
    //Creamos un set para que no se repitan los nombres
    const existingMembers = new Set<string>();
    const missingFollowers: string[] = [];

    //Recorremos los chats y vamos guardando los miembros.
    for (const chat of this.chats) {
      if(!chat.group) {
        chat.members.forEach(member => existingMembers.add(member));
      }
    }

    //Si el seguido no está en el Set eso quiere decir que no tenemos un chat con el
    for (const follow of this.followList) {
      if (!existingMembers.has(follow.followed)) {
        missingFollowers.push(follow.followed);
      }
    }

    this._missingFollowers = missingFollowers;
  }

  isUserOnline(userId: string): boolean {
    let isOnline: boolean = false;
    for (let i = 0; i < this.usersOnline.length && !isOnline; i++) {
      if (this.usersOnline[i].userId === userId) {
        isOnline = true;
      }
    }
    return isOnline;
  }

  getFollowed(): void {
    this.followService.getFollowed()
      .subscribe((res) => {
        this.followList = res
      })
  }

  createChat(member: string): void {
    const members: any[] = [];
    members.push({ 'username': this.username });
    members.push({ 'username': member });
    const chat: CreateChat = {
      members: members,
      group: false
    }
    this.chatService.createChat(chat)
      .subscribe((res) => {
        this.openDialog();
        this.ngOnInit();
      });
  }

  createGroup(): void {
    const members: any[] = [];
    members.push({ 'username': this.username });
    const chatGroup: CreateGroup = {
      name: this.groupName,
      members: members,
      group: true
    }
    this.chatService.createGroup(chatGroup)
      .subscribe((res) => {
        this.openGroupDialog();
        this.ngOnInit();
      })
  }

}
