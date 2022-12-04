import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { IonicModule } from '@ionic/angular';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { EmptyScreenComponent } from './components/empty-screen/empty-screen.component';

const components = [
  NewChatComponent,
  UserListComponent,
  HeaderComponent,
  EmptyScreenComponent,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, IonicModule],
})
export class SharedModule {}
