import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {CharacterSheet} from './character-sheet.class';
import {distinctUntilKeyChanged} from 'rxjs/operators/distinctUntilKeyChanged';
import {Perk} from './perk.class';
import * as _ from 'lodash';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {
  characterSheet: CharacterSheet;

  form: FormGroup;
  xpPerLevel: number[];

  private amountOfPerksUnlocked = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildBrute();
    this.buildSheetForm();
    this.initExperiencePerLevel();
    this.addPerks();
    this.countAmountOfPerksUnlocked();
    this.setupFormValueChanges();
    this.loadDataIntoForm();
  }

  private buildBrute() {
    const cs = new CharacterSheet();
    cs.name = 'Andi';
    cs.experiencePoints = 50;
    cs.experiencePointsNotes = 'hoppa';
    cs.gold = 18;
    cs.itemNotes = 'boots of farstriding, hide armor, potion of healing';
    cs.challengeSuccesses = [true, false, false];
    cs.perks = [
      new Perk(`Remove two '-1' cards`),
      new Perk(`Replace one '-1' card with one '+1' card`),
      new Perk(`Add two '+1' cards`),
      new Perk(`Add two '+1' cards`),
      new Perk(`Add one '+3' card`),
      new Perk(`Add three 'turn' PUSH 'push'1 card`),
      new Perk(`Add three 'turn' PUSH 'push'1 card`),
      new Perk(`Add one 'turn' STUN 'stun' card`),
      new Perk(`Add one 'turn' STUN 'stun' card`),
      new Perk(`Add two 'turn' PIERCE 'pierce'3 cards`),
      new Perk(`Add one 'turn' DISARM 'disarm' card and one 'turn' MUDDLE 'muddle' card`),
      new Perk(`Add one 'turn' ADD TARGET 'target' card`),
      new Perk(`Add one 'turn' ADD TARGET 'target' card`),
      new Perk(`Add on '+1' Shield 'shield'1, Self card`),
      new Perk(`Ignore negative item effects and add one '+1' card`),
    ];

    this.characterSheet = cs;
  }

  private buildSheetForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      experiencePoints: [0, Validators.required],
      experiencePointsNotes: [''],
      gold: [0],
      itemNotes: [''],
      perks: this.formBuilder.array([]),
      challengeSuccesses: this.formBuilder.array([
        false, false, false
      ])
    });
  }

  private initExperiencePerLevel() {
    this.xpPerLevel = [0, 45, 95, 150, 210, 275, 345, 420, 500];
  }

  private addPerks() {
    this.form.setControl('perks', this.formBuilder.array([
      this.formBuilder.group({
        description: 'Remove two \'-1\' cards',
        hasObtained: false
      })
    ]));
  }

  private countAmountOfPerksUnlocked() {
    this.amountOfPerksUnlocked = 0;
    const perks = this.form.controls.perks.value;

    _.each(perks, (perk) => {
      if (perk.hasObtained) {
        this.amountOfPerksUnlocked += 1;
      }
    });
  }

  private setupFormValueChanges() {
    this.form.controls.challengeSuccesses.valueChanges.subscribe((data) => {
      // if (!this.isUnableToUnlockPerk) {
      //   this.form.controls.perks.enable();
      // } else if (this.form.controls.perks.disabled) {
      //   this.form.controls.perks.disable();
      // }
    });

    this.form.controls.perks.valueChanges
      .subscribe((data) => {
        if (_.some(this.form.controls.challengeSuccesses.value, c => c === false)) {
          return;
        }

        const oldAmountOfPerksUnlocked = _.clone(this.amountOfPerksUnlocked);
        this.countAmountOfPerksUnlocked();

        if (oldAmountOfPerksUnlocked < this.amountOfPerksUnlocked) {
          this.form.controls.challengeSuccesses.setValue([false, false, false]);
        }
      });
  }

  private loadDataIntoForm() {
    if (!this.characterSheet) {
      return;
    }

    this.form.patchValue({
      name: this.characterSheet.name,
      experiencePoints: this.characterSheet.experiencePoints,
      experiencePointsNotes: this.characterSheet.experiencePointsNotes,
      gold: this.characterSheet.gold,
      itemNotes: this.characterSheet.itemNotes
    });

    if (this.characterSheet.challengeSuccesses) {
      const challengeSuccessesFormArray = this.formBuilder.array(this.characterSheet.challengeSuccesses);
      this.form.setControl('challengeSuccesses', challengeSuccessesFormArray);
    }

    if (this.characterSheet.perks) {
      const perks = this.characterSheet.perks.map(perk => this.formBuilder.group(perk));
      const perksFormArray = this.formBuilder.array(perks);
      this.form.setControl('perks', perksFormArray);
    }
  }

  public get isUnableToUnlockPerk() {
    return _.some(this.form.controls.challengeSuccesses.value, isChecked => isChecked === false);
  }

  hasCurrentLevelWith(xp: number, levelIndex: number) {
    const level = levelIndex + 1;
    let levelReached = 0;

    _.each(this.xpPerLevel, (xpRequired: number, index: number) => {
      if (xp >= xpRequired) {
        levelReached += 1;
      }
    });

    return level === levelReached;
  }
}
