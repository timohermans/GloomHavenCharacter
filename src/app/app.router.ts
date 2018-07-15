import {Router} from '@angular/router';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';
import {SheetsComponent} from './sheets/sheets.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './router/router.guard';
import { DungeonCounterComponent } from './dungeon-counter/dungeon-counter.component';
import {TransferComponent} from './transfer/transfer.component';


const appRoutes = [
  {path: '', redirectTo: '/sheets', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {path: 'sheets', component: SheetsComponent, canActivate: [AuthGuard], data: {state: 'players'}},
  {path: 'sheet/:id', component: CharacterSheetComponent, canActivate: [AuthGuard], data: {state: 'sheet'}},
  {path: 'dungeon', component: DungeonCounterComponent, data: {state: 'dungeonCounter'}},
  {path: 'transfer', component: TransferComponent, canActivate: [AuthGuard], data: {state: 'transfer'}}
];

export const AppRoutes = appRoutes;
