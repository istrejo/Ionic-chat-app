import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isTypePassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.form = new FormGroup({
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

  async login() {
    try {
      this.isLoading = true;
      if (this.form.valid) {
        const { email, password } = this.form.getRawValue();
        const user = await this.authService.login(email, password);
        this.isLoading = true;
        if (user) {
          this.router.navigate(['/home']);
          this.form.reset();
        }
      } else {
        this.form.markAllAsTouched();
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: login.page.ts:69 ~ LoginPage ~ login ~ error',
        error
      );
      this.isLoading = true;
      let msg: string = 'Could not sign you in, please try again.';
      if (error.code == 'auth/user-not-found')
        msg = 'E-mail address could not be found';
      else if (error.code == 'auth/wrong-password')
        msg = 'Please enter a correct password';
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
