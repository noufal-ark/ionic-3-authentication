import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { User } from 'firebase';

@Injectable()
export class FirebaseAuthProvider {

  constructor() {
    console.log('Hello FirebaseAuthProvider Provider');
  }


  /**
   * This method is used for login user using username and password.
   * @param email user email id
   * @param password user password
   */
  loginUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
