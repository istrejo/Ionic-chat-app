import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { NewChatComponent } from 'src/app/shared/components/new-chat/new-chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('popover') popover: PopoverController;

  segment: string = 'chats';
  users: Observable<any[]>;
  chatRooms: Observable<any[]>;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private chatservice: ChatService
  ) {}

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.chatservice.getChatRooms();
    this.chatRooms = this.chatservice.chatRooms;
    console.log('chatrooms: ', this.chatRooms);
  }

  async logout() {
    try {
      this.popover.dismiss();
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (e) {
      console.log(e);
    }
  }

  segmentChanged(event: any) {
    console.log(event);
  }

  async newChat() {
    if (!this.users) await this.getUsers();
    const modal = await this.modalCtrl.create({
      component: NewChatComponent,
      componentProps: {
        users: this.users,
      },
    });
    modal.present();
  }

  getUsers() {
    this.chatservice.getUsers();
    this.users = this.chatservice.users;
  }

  getChat(item) {
    this.router.navigate(['/', 'home', 'chats', item.id]);
  }

  getUser(user: any) {
    return user;
  }
}
