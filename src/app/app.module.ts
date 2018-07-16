import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CharacterSheetComponent} from './character-sheets/character-sheet/character-sheet.component';

import {AppRoutes} from './app.router';
import {CustomCounterComponent} from './shared/custom-counter/counter.component';
import {CharacterSheetListComponent} from './character-sheets/character-sheet-list/character-sheet-list.component';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import {StorageService} from './shared/storage/storage.service';
import {AuthGuard} from './shared/router/router.guard';

import {DungeonCounterComponent} from './dungeon-counters/dungeon-counter/dungeon-counter.component';
import {ConfirmButtonComponent} from './shared/confirm-button/confirm-button.component';
import {TransferComponent} from './dungeon-counters/transfer/transfer.component';
import {CharacterSheetService} from './character-sheets/shared/character-sheet.service';
import {HistoryComponent} from './character-sheets/history/history.component';
import { HistoryService } from './character-sheets/shared/history.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    CustomCounterComponent,
    CharacterSheetListComponent,
    HistoryComponent,
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
    HistoryService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
