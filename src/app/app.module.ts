import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';

import {AppRoutes} from './app.router';
import {CustomCounterComponent} from './character-sheet/custom-counter/counter.component';
import {MonstersComponent} from './monsters/monsters.component';
import {SheetsComponent} from './sheets/sheets.component';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import {StorageService} from './storage/storage.service';
import {AuthGuard} from './router/router.guard';

import {DungeonCounterComponent} from './dungeon-counter/dungeon-counter.component';
import {ConfirmButtonComponent} from './common/confirm-button/confirm-button.component';
import {TransferComponent} from './transfer/transfer.component';
import {CharacterSheetService} from './character-sheet/character-sheet.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    CustomCounterComponent,
    MonstersComponent,
    SheetsComponent,
    LoginComponent,
    DungeonCounterComponent,
    ConfirmButtonComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(StorageService.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    StorageService,
    CharacterSheetService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
