import {Perk} from './perk.class';

export interface CharacterSheet {
  id?: string;
  title: string;
  name: string;
  // level: number;
  experiencePoints: number;
  experiencePointsNotes: string;
  gold: number;
  // goldNotes: string;
  itemNotes: string;
  // items: Item[];
  // perkUnlocks: PerkUnlock[];
  perks: Perk[];
  challengeSuccesses: boolean[];
  email?: string;
}
