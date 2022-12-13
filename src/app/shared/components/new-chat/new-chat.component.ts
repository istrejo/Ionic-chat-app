import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss'],
})
export class NewChatComponent implements OnInit {
  @Input() users: Observable<any>;

  constructor(
    private modalCtrl: ModalController,
    private chatService: ChatService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }

  async startChat(item) {
    try {
      // this.global.showLoader();
      // create chatroom
      const loading = await this.loadingCtrl.create({});
      loading.present();
      const room = await this.chatService.createChatRoom(item?.uid);
      loading.dismiss();
      console.log('room: ', room);
      this.cancel();
      const navData: NavigationExtras = {
        queryParams: {
          name: item?.name,
        },
      };
      this.router.navigate(['/', 'home', 'chats', room?.id], navData);
      // this.global.hideLoader();
    } catch (e) {
      console.log(e);
      this.loadingCtrl.dismiss();

      // this.global.hideLoader();
    }
  }
}
