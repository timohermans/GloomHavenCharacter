import {CharacterSheet} from './character-sheet.class';
import {Perk} from './perk.class';

export enum Character {
  Brute,
  MindThief,
  Spellweaver,
  Tinkerer
}

export class CharacterSheetFactory {
  static buildSheet(character: Character) {
    switch (character) {
      case Character.Brute:
        return this._buildBrute();
      case Character.MindThief:
        // return this._buildMindThief();
      case Character.Spellweaver:
        // return this._buildSpellweaver();
      case Character.Tinkerer:
        // return this._buildTinkerer();
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
        {description: `Remove two '-1' cards`},
        {description: `Replace one '-1' card with one '+1' card`},
        {description: `Add two '+1' cards`},
        {description: `Add two '+1' cards`},
        {description: `Add one '+3' card`},
        {description: `Add three 'turn' PUSH 'push'1 card`},
        {description: `Add three 'turn' PUSH 'push'1 card`},
        {description: `Add one 'turn' STUN 'stun' card`},
        {description: `Add one 'turn' STUN 'stun' card`},
        {description: `Add two 'turn' PIERCE 'pierce'3 cards`},
        {description: `Add one 'turn' DISARM 'disarm' card and one 'turn' MUDDLE 'muddle' card`},
        {description: `Add one 'turn' ADD TARGET 'target' card`},
        {description: `Add one 'turn' ADD TARGET 'target' card`},
        {description: `Add on '+1' Shield 'shield'1, Self card`},
        {description: `Ignore negative item effects and add one '+1' card`},
      ],
    };
  }

  // private static _buildMindThief(): CharacterSheet {
    //   const cs = new CharacterSheet();
    //   cs.title = 'Vermling MindThief';
    //   cs.name = '';
    //   cs.experiencePoints = 0;
    //   cs.experiencePointsNotes = '';
    //   cs.gold = 0;
    //   cs.itemNotes = '';
    //   cs.challengeSuccesses = [false, false, false];
    //   cs.perks = [
    //     new Perk(`Remove two '-1' cards`),
    //     new Perk(`Remove two '-1' cards`),
    //     new Perk(`Remove four '+0' cards`),
    //     new Perk(`Replace two '+1' cards with two '+2' cards`),
    //     new Perk(`Replace one '-2' card with one '+0' card`),
    //     new Perk(`Add one '+2''Ice' card`),
    //     new Perk(`Add one '+2''Ice' card`),
    //     new Perk(`Add two 'draw''+1' cards`),
    //     new Perk(`Add two 'draw''+1' cards`),
    //     new Perk(`Add three 'turn'PULL'pull'1 cards`),
    //     new Perk(`Add three 'draw'MUDDLE'muddle' cards`),
    //     new Perk(`Add two 'draw'IMMOBILIZE'immobilize' cards`),
    //     new Perk(`Add one 'draw'STUN'stun' card`),
    //     new Perk(`Add one 'draw'DISARM'disarm' card and one 'draw'MUDDLE'muddle' card`),
    //     new Perk(`Ignore negative scenario effects`)
    //   ];

    //   return cs;
  // }

  // private static _buildSpellweaver() {
    //   const cs = new CharacterSheet();
    //   cs.title = 'Orchid Spellweaver';
    //   cs.name = '';
    //   cs.experiencePoints = 0;
    //   cs.experiencePointsNotes = '';
    //   cs.gold = 0;
    //   cs.itemNotes = '';
    //   cs.challengeSuccesses = [false, false, false];
    //   cs.perks = [
    //     new Perk(`Remove four '+0' cards`),
    //     new Perk(`Replace one '-1' card with one '+1' card`),
    //     new Perk(`Replace one '-1' card with one '+1' card`),
    //     new Perk(`Add two '+1' cards`),
    //     new Perk(`Add two '+1' cards`),
    //     new Perk(`Add one '+0'STUN'stun' card`),
    //     new Perk(`Add one '+1'WOUND'wound' card`),
    //     new Perk(`Add one '+1'IMMOBILIZE'immobilize' card`),
    //     new Perk(`Add one '+1'CURSE'curse' card`),
    //     new Perk(`Add one '+2''fire' card`),
    //     new Perk(`Add one '+2''fire' card`),
    //     new Perk(`Add one '+2''ice' card`),
    //     new Perk(`Add one '+2''ice' card`),
    //     new Perk(`Add one 'draw''grass' and one 'draw''wind' card`),
    //     new Perk(`Add one 'draw''light' and one 'draw''dark' card`)
    //   ];

    //   return cs;
  // }

  // private static _buildTinkerer() {
  //   const cs = new CharacterSheet();
  //   cs.title = 'Quatryl Tinkerer';
  //   cs.name = '';
  //   cs.experiencePoints = 0;
  //   cs.experiencePointsNotes = '';
  //   cs.gold = 0;
  //   cs.itemNotes = '';
  //   cs.challengeSuccesses = [false, false, false];
  //   cs.perks = [
  //     new Perk(`Remove two '-1' cards`),
  //     new Perk(`Remove two '-1' cards`),
  //     new Perk(`Replace one '-2' card with one '+0' card`),
  //     new Perk(`Add two '+1' cards`),
  //     new Perk(`Add one '+3' card`),
  //     new Perk(`Add two 'draw''fire' cards`),
  //     new Perk(`Add two 'draw''fire' cards`),
  //     new Perk(`Add three 'draw'MUDDLE'muddle' cards`),
  //     new Perk(`Add one '+1'WOUND'wound' card`),
  //     new Perk(`Add one '+1'WOUND'wound' card`),
  //     new Perk(`Add one '+1'IMMOBILIZE'immobilize' card`),
  //     new Perk(`Add one '+1'IMMOBILIZE'immobilize' card`),
  //     new Perk(`Add one '+1' Heal 'heal' 2 card`),
  //     new Perk(`Add one '+1' Heal 'heal' 2 card`),
  //     new Perk(`Add one +0 ADD TARGET'target' card`),
  //     new Perk(`Ignore negative scenario effects`)
  //   ];

  //   return cs;
  // }
}
