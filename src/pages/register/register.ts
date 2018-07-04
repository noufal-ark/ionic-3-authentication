import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validation_messages, PASSWORD_UNMATCH } from './../../message/error.message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    private formBuilder: FormBuilder) {
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
}
