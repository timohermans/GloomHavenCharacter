import { CharacterSheet } from '../character-sheet/character-sheet.class';

export interface Player {
  id: number;
  name: string;
  characterSheet: CharacterSheet;
}
