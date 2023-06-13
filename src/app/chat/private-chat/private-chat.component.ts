import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from '@stomp/stompjs';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { FollowService } from 'src/app/services/follow.service';
import { Chat } from 'src/interfaces/chat';
import { Follow } from 'src/interfaces/follow';
import { ChatMessage } from 'src/interfaces/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  chat!: Chat;
  messages: ChatMessage[] = [];
  messageInput: string = '';
  userLogued: string;
  chatId: string = '';
  _suscribeToPrivateMessages!: Subscription;
  visible: boolean = false;
  followList: Follow[] = [];
  addedMembers: any[] = [];
  _missingFollowers: string[] = [];
  actualPage: number = 1;
  getMessagesSubscription!: Subscription;
  
  constructor(private chatService: ChatService, private authService: AuthService, private activatedRoute: ActivatedRoute, private followService: FollowService, private router: Router, private ngZone: NgZone) {
    this.userLogued = authService.user.sub;
  }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe((res) => {
      this.chatId = res['id'];
      this.messages = [];
      this.getMessages(this.chatId);
      this.suscribeToPrivateMessages();
      this.chatService.getChat(res['id'])
      .subscribe({
        next: (res: Chat) => {
          this.chat = res;
          this.missingFollowers();
        },
        error: (err: HttpErrorResponse) => {
          if(err.status === 401) {
            Swal.fire({
              title: 'Wow looks like an error has occurred',
              text: "You don't have access to this chat"
            }).then(result => {
              if(result.isConfirmed) {
                this.router.navigate(['chat']);
              }
            })
          } else if(err.status === 404) {
            Swal.fire({
              title: 'Wow looks like an error has occurred',
              text: err.error.message
            }).then(result => {
              if(result.isConfirmed) {
                this.router.navigate(['chat']);
              }
            })
          }
        }
      })
    });
    this.getFollowed();
  }

  ngAfterViewChecked() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    });
  }

  ngOnDestroy() {
    this._suscribeToPrivateMessages.unsubscribe();
  }

  private suscribeToPrivateMessages() {
    if(this._suscribeToPrivateMessages) {
      this._suscribeToPrivateMessages.unsubscribe();
    }
    this._suscribeToPrivateMessages = this.chatService.subscribeToPrivateMessages(this.chatId).subscribe((message: IMessage) => {
      const messageJSON: ChatMessage = JSON.parse(message.body);
      this.messages.push(messageJSON);
    });
  }

  onScrolledUp(event: IInfiniteScrollEvent): void {
    this.scrollContainer.nativeElement = event;
    this.actualPage++;
    this.getMessages(this.chatId);
  }

  openDialog(): void {
    this.visible = !this.visible;
  }

  getFollowed(): void {
    this.followService.getFollowed()
    .subscribe((res) => {
      this.followList = res;
    })
  }

  missingFollowers(): string[] {
    if(this.chat.group) {
      const members = this.chat.members;
      this.followList.forEach((value) => {
        if(!members.includes(value.followed)) {
          this._missingFollowers.push(value.followed);
        }
      })
    }
    return this._missingFollowers;
  }

  addedMember(member: string): boolean {
    let exist = false;
    for(let i=0; i < this.addedMembers.length && !exist; i++) {
      if(this.addedMembers[i].username === member) {
        exist = true;
      }
    }
    return exist;
  }

  removeMember(member: string): void {
    this.addedMembers = this.addedMembers.filter((value) => value.username != member);
  }

  private getMessages(chatId: string): void {
    this.getMessagesSubscription = this.chatService.getMessages(chatId, this.actualPage)
    .subscribe((res: any) => {
      this.messages.unshift(...res.content);
    })
  }

  sendMessage() {
    const sender: string = this.authService.user.sub;
    const recipient: string = this.chat.members.filter(value => value != sender)[0];
    const chatMessage: ChatMessage = {
      sender,
      recipient,
      message: this.messageInput,
      chatId: this.chatId,
      sendDate: new Date()
    }
    this.chatService.sendPrivateMessage(chatMessage);
    this.messageInput = '';
  }

  getRecipientUser(): string {
    return this.chat.members.filter((value) => value != this.userLogued)[0];
  }

  addMember(member: string): void {
    this.addedMembers.push({'username': member});
  }

  addMembers(): void {
    this.chatService.addMembers(this.chat.id, this.addedMembers)
    .subscribe({
      next: () => {
        this.visible = false;
        this._missingFollowers = [];
        this.ngOnInit();
      }
    });
  }

}
