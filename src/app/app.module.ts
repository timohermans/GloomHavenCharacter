import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';

import {AppRoutes} from './app.router';
import {CustomCounterComponent} from './character-sheet/custom-counter/counter.component';
import {MonstersComponent} from './monsters/monsters.component';
import {PlayersComponent} from './players/players.component';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {StorageService} from './storage/storage.service';
import {AuthGuard} from './router/router.guard';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    CustomCounterComponent,
    MonstersComponent,
    PlayersComponent,
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
