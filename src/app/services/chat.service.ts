import { Injectable } from '@angular/core';
import { StompHeaders, StompRService } from '@stomp/ng2-stompjs';
import { ChatMessage } from 'src/interfaces/message';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Chat, CreateChat, CreateGroup } from 'src/interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private stompService: StompRService, private authService: AuthService, private http: HttpClient) {
  }

  connect() {
    const headers: StompHeaders = {
      'userId': this.authService.user.sub
    }
    this.stompService.config = {
      url: 'ws://localhost:8080/socket',
      headers: headers,
      heartbeat_in: 0,
      heartbeat_out: 50000,
      reconnect_delay: 5000,
      debug: true
    };
    this.stompService.initAndConnect();
  }

  disconnect() {
    this.stompService.disconnect();
  }

  sendPrivateMessage(privateMessage: ChatMessage) {
    this.stompService.publish({ destination: `/app/chat`, body: JSON.stringify(privateMessage) });
  }

  checkConnection() {
    this.stompService.publish({ destination: `/app/checkstatus`, body: '' })
  }

  suscribeToCheckStatus() {
    return this.stompService.subscribe('/topic/checkstatus');
  }

  subscribeToPrivateMessages(chatId: string) {
    return this.stompService.subscribe(`/topic/chat.${chatId}.${this.authService.user.sub}`);
  }

  getChatsForUser(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url}/chats/${this.authService.user.sub}`);
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

}
