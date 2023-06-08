import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ChatsComponent } from './chats/chats.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ChatsComponent,
    children: [
      {
        path: ':id',
        component: PrivateChatComponent
      },
      {
        path:'notfound',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

