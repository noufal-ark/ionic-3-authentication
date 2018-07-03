import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { validation_messages } from './../../message/error.message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  authForgotForm: FormGroup;
  validation_messages = validation_messages;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder) {
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

}

