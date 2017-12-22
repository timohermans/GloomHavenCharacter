import {CharacterSheet} from './character-sheet.class';
import {Perk} from './perk.class';

export enum Character {
  Brute,
  MindThief,
  Spellweaver,
  Tinkerer
}

export class CharacterSheetFactory {
  static buildSheet(character: Character): CharacterSheet {
    switch (character) {
      case Character.Brute:
        return this._buildBrute();
      case Character.MindThief:
        return this._buildMindThief();
      case Character.Spellweaver:
        return this._buildSpellweaver();
      case Character.Tinkerer:
        return this._buildTinkerer();
      default:
        throw new Error(`factory doesn't support ${character}`);
    }
  }

  private static _buildBrute(): CharacterSheet {
    return {
      title: 'Inox Brute',
      name: '',
      experiencePoints: 0,
      experiencePointsNotes: '',
      gold: 0,
      itemNotes: '',
      challengeSuccesses: [false, false, false],
      perks: [
        {description: `Remove two '-1' cards`, hasObtained: false},
        {description: `Replace one '-1' card with one '+1' card`, hasObtained: false},
        {description: `Add two '+1' cards`, hasObtained: false},
        {description: `Add two '+1' cards`, hasObtained: false},
        {description: `Add one '+3' card`, hasObtained: false},
        {description: `Add three 'turn' PUSH 'push'1 card`, hasObtained: false},
        {description: `Add three 'turn' PUSH 'push'1 card`, hasObtained: false},
        {description: `Add one 'turn' STUN 'stun' card`, hasObtained: false},
        {description: `Add one 'turn' STUN 'stun' card`, hasObtained: false},
        {description: `Add two 'turn' PIERCE 'pierce'3 cards`, hasObtained: false},
        {description: `Add one 'turn' DISARM 'disarm' card and one 'turn' MUDDLE 'muddle' card`, hasObtained: false},
        {description: `Add one 'turn' ADD TARGET 'target' card`, hasObtained: false},
        {description: `Add one 'turn' ADD TARGET 'target' card`, hasObtained: false},
        {description: `Add on '+1' Shield 'shield'1, Self card`, hasObtained: false},
        {description: `Ignore negative item effects and add one '+1' card`, hasObtained: false},
      ],
    };
  }

  private static _buildMindThief(): CharacterSheet {
    return {
      title: 'Vermling MindThief',
      name: '',
      experiencePoints: 0,
      experiencePointsNotes: '',
      gold: 0,
      itemNotes: '',
      challengeSuccesses: [false, false, false],
      perks: [
        {description: `Remove two '-1' cards`, hasObtained: false},
        {description: `Remove two '-1' cards`, hasObtained: false},
        {description: `Remove four '+0' cards`, hasObtained: false},
        {description: `Replace two '+1' cards with two '+2' cards`, hasObtained: false},
        {description: `Replace one '-2' card with one '+0' card`, hasObtained: false},
        {description: `Add one '+2''Ice' card`, hasObtained: false},
        {description: `Add one '+2''Ice' card`, hasObtained: false},
        {description: `Add two 'draw''+1' cards`, hasObtained: false},
        {description: `Add two 'draw''+1' cards`, hasObtained: false},
        {description: `Add three 'turn'PULL'pull'1 cards`, hasObtained: false},
        {description: `Add three 'draw'MUDDLE'muddle' cards`, hasObtained: false},
        {description: `Add two 'draw'IMMOBILIZE'immobilize' cards`, hasObtained: false},
        {description: `Add one 'draw'STUN'stun' card`, hasObtained: false},
        {description: `Add one 'draw'DISARM'disarm' card and one 'draw'MUDDLE'muddle' card`, hasObtained: false},
        {description: `Ignore negative scenario effects`, hasObtained: false}
      ]
    };
  }

  private static _buildSpellweaver() {
    return {
      title: 'Orchid Spellweaver',
      name: '',
      experiencePoints: 0,
      experiencePointsNotes: '',
      gold: 0,
      itemNotes: '',
      challengeSuccesses: [false, false, false],
      perks: [
        {description: `Remove four '+0' cards`, hasObtained: false},
        {description: `Replace one '-1' card with one '+1' card`, hasObtained: false},
        {description: `Replace one '-1' card with one '+1' card`, hasObtained: false},
        {description: `Add two '+1' cards`, hasObtained: false},
        {description: `Add two '+1' cards`, hasObtained: false},
        {description: `Add one '+0'STUN'stun' card`, hasObtained: false},
        {description: `Add one '+1'WOUND'wound' card`, hasObtained: false},
        {description: `Add one '+1'IMMOBILIZE'immobilize' card`, hasObtained: false},
        {description: `Add one '+1'CURSE'curse' card`, hasObtained: false},
        {description: `Add one '+2''fire' card`, hasObtained: false},
        {description: `Add one '+2''fire' card`, hasObtained: false},
        {description: `Add one '+2''ice' card`, hasObtained: false},
        {description: `Add one '+2''ice' card`, hasObtained: false},
        {description: `Add one 'draw''grass' and one 'draw''wind' card`, hasObtained: false},
        {description: `Add one 'draw''light' and one 'draw''dark' card`, hasObtained: false}
      ],
    };
  }

  private static _buildTinkerer() {
    return {
      title: 'Quatryl Tinkerer',
      name: '',
      experiencePoints: 0,
      experiencePointsNotes: '',
      gold: 0,
      itemNotes: '',
      challengeSuccesses: [false, false, false],
      perks: [
        { description: `Remove two '-1' cards`, hasObtained: false },
        { description: `Remove two '-1' cards`, hasObtained: false },
        { description: `Replace one '-2' card with one '+0' card`, hasObtained: false },
        { description: `Add two '+1' cards`, hasObtained: false },
        { description: `Add one '+3' card`, hasObtained: false },
        { description: `Add two 'draw''fire' cards`, hasObtained: false },
        { description: `Add two 'draw''fire' cards`, hasObtained: false },
        { description: `Add three 'draw'MUDDLE'muddle' cards`, hasObtained: false },
        { description: `Add one '+1'WOUND'wound' card`, hasObtained: false },
        { description: `Add one '+1'WOUND'wound' card`, hasObtained: false },
        { description: `Add one '+1'IMMOBILIZE'immobilize' card`, hasObtained: false },
        { description: `Add one '+1'IMMOBILIZE'immobilize' card`, hasObtained: false },
        { description: `Add one '+1' Heal 'heal' 2 card`, hasObtained: false },
        { description: `Add one '+1' Heal 'heal' 2 card`, hasObtained: false },
        { description: `Add one +0 ADD TARGET'target' card`, hasObtained: false },
        { description: `Ignore negative scenario effects`, hasObtained: false }
      ],
    };
  }
}
