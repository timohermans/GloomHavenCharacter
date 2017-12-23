import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';

import {AppRoutes} from './app.router';
import {CustomCounterComponent} from './character-sheet/custom-counter/counter.component';
import {MonstersComponent} from './monsters/monsters.component';
import {SheetsComponent} from './sheets/sheets.component';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import {StorageService} from './storage/storage.service';
import {AuthGuard} from './router/router.guard';

import * as firebase from 'firebase';

export function initFirebase() {
  return () => {
    return new Promise((resolve) => {
      const config = {
        apiKey: 'AIzaSyDjU_Op3X-HTkC2k-NEGzN0TYEBLrxO4Nc',
        authDomain: 'gloomhaven-44hr.firebaseapp.com',
        databaseURL: 'https://gloomhaven-44hr.firebaseio.com',
        projectId: 'gloomhaven-44hr',
        storageBucket: '',
        messagingSenderId: '493813395914'
      };

      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((accessToken) => {
            const userLoggedIn = {
              displayName: user.displayName,
              email: user.email,
              token: accessToken
            };
          });
        }
        resolve();
      }, function (error) {
        console.log(error);
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    CustomCounterComponent,
    MonstersComponent,
    SheetsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(StorageService.config),
    AngularFirestoreModule
  ],
  providers: [
    StorageService,
    AuthGuard,
    {provide: APP_INITIALIZER, useFactory: initFirebase, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
