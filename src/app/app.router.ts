import {Router} from '@angular/router';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';
import {MonstersComponent} from './monsters/monsters.component';
import {SheetsComponent} from './sheets/sheets.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './router/router.guard';


const appRoutes = [
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {path: 'sheets', component: SheetsComponent, canActivate: [AuthGuard], data: {state: 'players'}},
  {path: 'sheet/:id', component: CharacterSheetComponent, canActivate: [AuthGuard], data: {state: 'players'}},
];

export const AppRoutes = appRoutes;
