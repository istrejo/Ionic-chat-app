import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NewChatComponent } from 'src/app/shared/components/new-chat/new-chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('popover') popover: PopoverController;

  segment: string = 'chats';
  users: any[] = [
    {
      id: 1,
      name: 'Albert',
      photo: 'https://i.pravatar.cc/385',
    },
    {
      id: 1,
      name: 'Gaby',
      photo: 'https://i.pravatar.cc/385',
    },
    {
      id: 1,
      name: 'Viviana',
      photo: 'https://i.pravatar.cc/385',
    },
    {
      id: 1,
      name: 'Sofía',
      photo: 'https://i.pravatar.cc/385',
    },
  ];
  chatRooms: any[] = [
    {
      id: 1,
      name: 'Albert',
      photo: 'https://i.pravatar.cc/385',
    },
    {
      id: 2,
      name: 'Gaby',
      photo: 'https://i.pravatar.cc/385',
    },
    {
      id: 3,
      name: 'Viviana',
      photo: 'https://i.pravatar.cc/385',
    },
    {
      id: 4,
      name: 'Sofía',
      photo: 'https://i.pravatar.cc/385',
    },
  ];

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.popover.dismiss();
  }

  segmentChanged(event: any) {
    console.log(event);
  }

  async newChat() {
    const modal = await this.modalCtrl.create({
      component: NewChatComponent,
      componentProps: {
        users: this.users,
      },
    });
    modal.present();
  }

  getChat(item) {
    this.router.navigate(['/', 'home', 'chats', item.id]);
  }
}
