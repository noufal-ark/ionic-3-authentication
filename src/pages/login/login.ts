import { validation_messages } from './../../message/error.message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  authForm: FormGroup;
  validation_messages=validation_messages;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder) {
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

}
