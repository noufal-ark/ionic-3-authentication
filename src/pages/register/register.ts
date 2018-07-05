import { LoadingProvider } from './../../providers/loading/loading';
import { FirebaseAuthProvider } from './../../providers/firebase-auth/firebase-auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validation_messages, PASSWORD_UNMATCH } from './../../message/error.message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  authRegisterForm: FormGroup;
  validation_messages = validation_messages;
  PASSWORD_UNMATCH = PASSWORD_UNMATCH;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  placeholderMobile = '';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private firebaseAuthProvider: FirebaseAuthProvider,
    private loadingCtrl: LoadingProvider,
    private popoverCtrl: PopoverController) {
    this.authRegisterForm = formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(5),
        // Validators.maxLength(25),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      password: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(6)])],
      personName: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(64),
        Validators.pattern(/^[a-zA-Z ]{2,30}$/)])],
      mobile: ['', Validators.compose(
        [Validators.required,
        Validators.minLength(14)])],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  /**
   * To make standard telecommunication numbering based on US. 
   * @param input key input
   */
  formatMobileNumber(input) {
    setTimeout(() => {
      var x = this.authRegisterForm.controls.mobile.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.authRegisterForm.controls.mobile.setValue(!x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : ''));
      input.selectionStart = input.selectionEnd = 1000;
    }, 0);
    input.selectionStart = input.selectionEnd = 1000;
  }
  /**
   * This method used to change placeholder value when input get focus.
   */
  onMobileFocus() {
    this.placeholderMobile = '(555) 555-5555';
  }
  /**
   * This method used to change placeholder value when input get focus out.
   */
  onMobileFocusOut() {
    this.placeholderMobile = '';
  }

  /**
   * To match password and return boolean.
   * @param passwordKey password value
   * @param confirmPasswordKey confirm password value
   */
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
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

  registerUser() {
    if (!this.authRegisterForm.valid) {
      console.log(`Form is not valid yet, current value: `);
      console.log(this.authRegisterForm.value);

      this.markFormGroupTouched(this.authRegisterForm)
    } else {
      this.loadingCtrl.presentWithGif1();

      console.log(this.authRegisterForm.value);

      const fullName = this.authRegisterForm.value.personName;
      const email = this.authRegisterForm.value.email;
      const mobile = this.authRegisterForm.value.mobile;
      const password = this.authRegisterForm.value.password;

      this.firebaseAuthProvider.registerUser(email, password).then(data => {
        console.log(data);
        this.loadingCtrl.dismiss();
        this.navCtrl.setRoot('DashboardPage');
      }).catch(err => {
        console.log(err);

        const err_code = err.code;
        let err_header = '';
        let err_body = '';
        switch (err_code) {
          case ('auth/email-already-in-use'):
            err_header = 'UNABLE TO REGISTER';
            err_body = 'The email already in use. Please login with your email.';
            break;
          case ('auth/invalid-email'):
            err_header = 'INVALID EMAIL';
            err_body = 'The email you entered is invalid email format. Please enter valid email.';
            break;
          case ('auth/operation-not-allowed'):
            err_header = 'USER DISABLED';
            err_body = 'The user account email/password has been disabled by an administrator. Please contact to administrator.';
            break;
          case ('auth/weak-password'):
            err_header = 'WEAK PASSWORD';
            err_body = 'The password you entered is too weak password format. Please enter strong password.';
            break;
          default:
            err_header = 'UNABLE TO REGISTER';
            err_body = 'The email or password that you typed is incorrect. Please try again.';

        }

        this.loadingCtrl.dismiss();
        const popover = this.popoverCtrl.create('CommonPopupPage',
          { heading: err_header, body: err_body });
        popover.present();
      });
    }
  }

  goToLogin() {
    this.navCtrl.pop();
  }
}
