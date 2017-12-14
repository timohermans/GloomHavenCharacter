import {Item} from './item.class';
import {PerkUnlock} from './perk-unlock.class';
import {Perk} from './perk.class';

export class CharacterSheet {
  title: string;
  name: string;
  level: number;
  experiencePoints: number;
  experiencePointsNotes: string;
  gold: number;
  goldNotes: string;
  items: Item[];
  perkUnlocks: PerkUnlock[];
  perks: Perk[];
}
