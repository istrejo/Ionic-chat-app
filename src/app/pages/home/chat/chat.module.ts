import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatBoxComponent } from 'src/app/home/chat/components/chat-box/chat-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    SharedModule,
  ],
  declarations: [ChatPage, ChatBoxComponent],
})
export class ChatPageModule {}
