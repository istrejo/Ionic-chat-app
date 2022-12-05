import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  isTypePassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingserive: LoadingService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.signupForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  async register() {
    try {
      this.loadingserive.presentLoading();
      if (this.signupForm.valid) {
        const { email, password, username } = this.signupForm.getRawValue();
        const user = await this.authService.register(email, password, username);
        if (user) {
          console.log(
            '🚀 ~ file: signup.page.ts:53 ~ SignupPage ~ register ~ user',
            user
          );
          this.router.navigate(['/home']);
          this.signupForm.reset();
          this.loadingserive.dismissLoading();
        }
      } else {
        this.signupForm.markAllAsTouched();
      }
    } catch (error) {
      this.loadingserive.dismissLoading();
      console.log(error);
      let msg: string = 'Could not sign you up, please try again.';
      if (error.code == 'auth/email-already-in-use') {
        msg = 'Email already in use';
      }
      this.presentAler(msg);
    }
  }

  async presentAler(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['OK'],
    });

    alert.present();
  }
}
