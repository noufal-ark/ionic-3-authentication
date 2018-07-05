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
  /**
   * This method is used to logout user from firebase authentication.
   */
  logoutUser() {
    // localStorage.setItem('userId', '');
    return firebase.auth().signOut();
  }
  /**
     * This method is used for register user account using username and password.
     * And  
     * @param email email id of user
     * @param password password of user
     */
  registerUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  /**
  * This method is used to reset password with firebase inbuilt method.
  * @param email email id of user used for register in account
  * @param actionCodeSettings actionCodeSettings is optional for register in account
  */
  forgotPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
