import { LoadingProvider } from './../../providers/loading/loading';
import { FirebaseAuthProvider } from './../../providers/firebase-auth/firebase-auth';
import { validation_messages } from './../../message/error.message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  authForm: FormGroup;
  validation_messages = validation_messages;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private firebaseAuthProvider: FirebaseAuthProvider,
    private loadingCtrl: LoadingProvider,
    private popoverCtrl: PopoverController) {
    this.authForm = formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(5),
        // Validators.maxLength(25),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser() {
    if (!this.authForm.valid) {
      console.log(`Form is not valid yet, current value: `);
      console.log(this.authForm.value);

      this.markFormGroupTouched(this.authForm)
    } else {
      this.loadingCtrl.presentWithGif1();

      console.log(this.authForm.value);

      const email = this.authForm.value.email;
      const password = this.authForm.value.password;

      this.firebaseAuthProvider.loginUser(email, password).then(data => {
        console.log(data);
        this.loadingCtrl.dismiss();
        this.navCtrl.setRoot('DashboardPage');
      }).catch(err => {
        console.log(err);

        const err_code = err.code;
        let err_header = '';
        let err_body = '';
        switch (err_code) {
          case ('auth/wrong-password'):
            err_header = 'UNABLE TO LOGIN';
            err_body = 'The password that you typed is incorrect.';
            break;
          case ('auth/user-not-found'):
            err_header = 'USER NOT FOUND';
            err_body = 'There is no user found corresponding to ' + email + ' mail id.';
            break;
          case ('auth/user-disabled'):
            err_header = 'USER DISABLED';
            err_body = 'The user account has been disabled by an administrator. Please contact to administrator';
            break;
          default:
            err_header = 'UNABLE TO LOGIN';
            err_body = 'The email or password that you typed is incorrect.';

        }

        this.loadingCtrl.dismiss();
        const popover = this.popoverCtrl.create('CommonPopupPage',
          { heading: err_header, body: err_body });
        popover.present();
      });
    }
  }

  goToForgot() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }
  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The group to caress..hah
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

}
