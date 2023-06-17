import { Injectable } from '@angular/core';
import { StompHeaders, StompRService } from '@stomp/ng2-stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Chat, CreateChat, CreateGroup } from 'src/interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private userId: string = '';
  private closeChats = new BehaviorSubject<boolean>(false);
  
  constructor(private stompService: StompRService, private http: HttpClient) {
    if(sessionStorage.getItem('isClosedChat') === 'true') {
      this.closeChats.next(true);
    }
  }

  get isCloseChats() {
    return this.closeChats.asObservable();
  }

  changeToCloseChat(): void {
    this.closeChats.next(true);
    sessionStorage.setItem('isClosedChat', 'true');
  }

  changeToOpenChat(): void {
    this.closeChats.next(false);
    sessionStorage.setItem('isClosedChat', 'false');
  }

  connect() {
    const user = localStorage.getItem('user');
    if(user != null) {
      this.userId = JSON.parse(user).sub;
    }
    const headers: StompHeaders = {
      'userId': this.userId
    }

    this.stompService.config = {
      url: environment.socketUrl,
      headers: headers,
      heartbeat_in: 0,
      heartbeat_out: 50000,
      reconnect_delay: 5000,
      debug: false
    };

    this.stompService.initAndConnect();
    this.stompService.errorSubject.subscribe({
      next: (res) => console.log(res)
    })
  }

  disconnect() {
    this.stompService.disconnect();
  }

  sendPrivateMessage(privateMessage: any) {
    this.stompService.publish({ destination: `/app/chat`, body: JSON.stringify(privateMessage) });
  }

  checkConnection() {
    this.stompService.publish({ destination: `/app/checkstatus`, body: '' })
  }

  suscribeToCheckStatus() {
    return this.stompService.subscribe('/topic/checkstatus');
  }

  subscribeToPrivateMessages(chatId: string) {
    return this.stompService.subscribe(`/topic/chat.${chatId}.${this.userId}`);
  }

  getChatsForUser(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url}/chats/${this.userId}`);
  }

  getChat(chatId: string): Observable<Chat> {
    return this.http.get<Chat>(`${environment.url}/chat/${chatId}`);
  }

  getMessages(chatId: string, pagNum: number): Observable<any> {
    return this.http.get<any>(`${environment.url}/chat/messages/${chatId}?pagNum=${pagNum}`);
  }

  createChat(chat: CreateChat): Observable<CreateChat> {
    return this.http.post<CreateChat>(`${environment.url}/chat/create`, chat);
  }

  createGroup(group: CreateGroup): Observable<CreateGroup> {
    return this.http.post<CreateGroup>(`${environment.url}/chat/create`, group);
  }

  addMembers(chatId: string, members: any[]): Observable<Chat> {
    return this.http.put<Chat>(`${environment.url}/chat/group/${chatId}/addmembers`, members);
  }

  leaveGroup(chatId: string): Observable<Chat> {
    return this.http.delete<Chat>(`${environment.url}/chat/${chatId}/leave/${this.userId}`);
  }

  deleteChat(chatId: string): Observable<Chat> {
    return this.http.delete<Chat>(`${environment.url}/chat/${chatId}/delete`);
  }

}
