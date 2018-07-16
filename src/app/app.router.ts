import {CharacterSheetComponent} from './character-sheets/character-sheet/character-sheet.component';
import {CharacterSheetListComponent} from './character-sheets/character-sheet-list/character-sheet-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/router/router.guard';
import { DungeonCounterComponent } from './dungeon-counters/dungeon-counter/dungeon-counter.component';
import {TransferComponent} from './dungeon-counters/transfer/transfer.component';


const appRoutes = [
  {path: '', redirectTo: '/sheets', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {path: 'sheets', component: CharacterSheetListComponent, canActivate: [AuthGuard], data: {state: 'players'}},
  {path: 'sheet/:id', component: CharacterSheetComponent, canActivate: [AuthGuard], data: {state: 'sheet'}},
  {path: 'dungeon', component: DungeonCounterComponent, data: {state: 'dungeonCounter'}},
  {path: 'transfer', component: TransferComponent, canActivate: [AuthGuard], data: {state: 'transfer'}}
];

export const AppRoutes = appRoutes;
