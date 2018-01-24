import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

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

  public currentUser: any;

  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
  }

  login(username: string, password: string): Promise<any> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(username, password)
              .then((user) => {
                this.currentUser = user;
              });
  }

  isLoggedIn(): boolean {
    return !_.isNil(this.firebaseAuth.auth.currentUser);
  }

  logout(): void {
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
