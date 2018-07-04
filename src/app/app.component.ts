import { firebaseConfig } from './../credentials/firebase.credentials';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen) {

    console.log('Version : v1.0.0');
    // To disable log.
    // console.log = () => { };
    
    firebase.initializeApp(firebaseConfig)
    this.checkUserAuthentication();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  checkUserAuthentication() {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = 'DashboardPage';
        unsubscribe();
      }
    });
  }
}

