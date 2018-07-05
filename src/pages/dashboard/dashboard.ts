import { FirebaseAuthProvider } from './../../providers/firebase-auth/firebase-auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController,
    private authProvider: FirebaseAuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  logout() {
    this.authProvider.logoutUser().finally(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
