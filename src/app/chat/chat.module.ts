import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { FormsModule } from '@angular/forms';
import { ChatsComponent } from './chats/chats.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    PrivateChatComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TooltipModule,
    DialogModule,
    InfiniteScrollModule
  ]
})
export class ChatModule { }
