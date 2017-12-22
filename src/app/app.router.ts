import {Router} from '@angular/router';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';
import {MonstersComponent} from './monsters/monsters.component';
import {PlayersComponent} from './players/players.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './router/router.guard';


const appRoutes = [
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {path: 'players', component: PlayersComponent, canActivate: [AuthGuard], data: {state: 'players'}},
  {path: 'sheet', component: CharacterSheetComponent, canActivate: [AuthGuard], data: {state: 'sheet'}},
  {path: 'monsters', component: MonstersComponent, canActivate: [AuthGuard], data: {state: 'monsters'}}
];

export const AppRoutes = appRoutes;
