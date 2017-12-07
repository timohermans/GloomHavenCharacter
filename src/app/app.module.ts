import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';

import { AppRoutes } from './app.router';
import { CustomCounterComponent } from './character-sheet/custom-counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    CustomCounterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
