import { Router } from '@angular/router';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import {MonstersComponent} from './monsters/monsters.component';


const appRoutes = [
  { path: 'sheet', component: CharacterSheetComponent, data: { state: 'sheet'} },
  { path: 'monsters', component: MonstersComponent, data: { state: 'monsters'} }
];

export const AppRoutes = appRoutes;
