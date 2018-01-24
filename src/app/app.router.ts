import {Router} from '@angular/router';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';
import {MonstersComponent} from './monsters/monsters.component';
import {SheetsComponent} from './sheets/sheets.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './router/router.guard';
import { DungeonCounterComponent } from './dungeon-counter/dungeon-counter.component';


const appRoutes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {path: 'sheets', component: SheetsComponent, canActivate: [AuthGuard], data: {state: 'players'}},
  {path: 'sheet/:id', component: CharacterSheetComponent, canActivate: [AuthGuard], data: {state: 'sheet'}},
  {path: 'dungeon', component: DungeonCounterComponent, data: {state: 'dungeonCounter'}},
];

export const AppRoutes = appRoutes;
