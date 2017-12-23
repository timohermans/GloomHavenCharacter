import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import * as _ from 'lodash';
import {Router} from '@angular/router';

interface User {
  displayName: string;
  email: string;
  token: string;
}

@Injectable()
export class StorageService {
  public static config = {
    apiKey: 'AIzaSyDjU_Op3X-HTkC2k-NEGzN0TYEBLrxO4Nc',
    authDomain: 'gloomhaven-44hr.firebaseapp.com',
    databaseURL: 'https://gloomhaven-44hr.firebaseio.com',
    projectId: 'gloomhaven-44hr',
    storageBucket: '',
    messagingSenderId: '493813395914'
  };

  userLoggedIn: User;
  firebaseUiConfig: any;
  firebaseUi: any;
  db: any;

  constructor(private router: Router) {
  }

  startFirebaseLogin(id: string): void {
    this.firebaseUiConfig = {
      signInSuccessUrl: '/sheets',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
      // Terms of service url.
      // tosUrl: '<your-tos-url>'
    };

    if (!this.firebaseUi) {
      this.firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
    }
    this.firebaseUi.start(id, this.firebaseUiConfig);
  }

  handleAuthentication(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((accessToken) => {
          const userLoggedIn = {
            displayName: user.displayName,
            email: user.email,
            token: accessToken
          };

          if (_.isNil(this.userLoggedIn)) {
            this.router.navigate(['/sheets']);
          }

          this.userLoggedIn = userLoggedIn;
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    }, function (error) {
      console.log(error);
    });
  }

  isLoggedIn(): boolean {
    return !!firebase.auth().currentUser;
  }

  logout(): void {
    this.userLoggedIn = null;
    firebase.auth().signOut();
    this.router.navigateByUrl('/login');
  }
}
