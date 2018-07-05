import { LoadingProvider } from './../../providers/loading/loading';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { validation_messages } from './../../message/error.message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth';


@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  authForgotForm: FormGroup;
  validation_messages = validation_messages;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private firebaseAuthProvider: FirebaseAuthProvider,
    private loadingCtrl: LoadingProvider,
    private popoverCtrl: PopoverController) {
    this.authForgotForm = formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(5),
        // Validators.maxLength(25),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  resetPasswordUser() {
    if (!this.authForgotForm.valid) {
      console.log(`Form is not valid yet, current value: `);
      console.log(this.authForgotForm.value);

      this.markFormGroupTouched(this.authForgotForm)
    } else {
      this.loadingCtrl.presentWithGif1();

      console.log(this.authForgotForm.value);

      const email = this.authForgotForm.value.email;

      this.firebaseAuthProvider.forgotPassword(email).then(data => {
        console.log(data);
        this.loadingCtrl.dismiss();
        this.navCtrl.pop();
      }).catch(err => {
        console.log(err);

        const err_code = err.code;
        let err_header = '';
        let err_body = '';
        switch (err_code) {
          case ('auth/invalid-email'):
            err_header = 'UNABLE TO RESET';
            err_body = 'The email id that you typed is invalid.';
            break;
          case ('auth/user-not-found'):
            err_header = 'USER NOT FOUND';
            err_body = 'There is no user found corresponding to ' + email + ' address.';
            break;
          default:
            err_header = 'UNABLE TO RESET';
            err_body = 'The email that you typed is incorrect.';

        }

        this.loadingCtrl.dismiss();
        const popover = this.popoverCtrl.create('CommonPopupPage',
          { heading: err_header, body: err_body });
        popover.present();
      });
    }
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

  goToRegister() {
    this.navCtrl.pop();
    this.navCtrl.push('RegisterPage');
  }

  goToLogin() {
    this.navCtrl.pop();
  }

}

