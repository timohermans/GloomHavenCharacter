import {Component, OnInit, OnChanges} from '@angular/core';
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
  form: FormGroup;
  xpPerLevel: number[];

  private amountOfPerksUnlocked = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildSheetForm();
    this.initExperiencePerLevel();
    this.addPerks();
    this.countAmountOfPerksUnlocked();
    this.setupFormValueChanges();
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
        hasObtained: {value: false, disabled: this.isUnableToUnlockPerk}
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
      if (!this.isUnableToUnlockPerk) {
        this.form.controls.perks.enable();
      } else if (this.form.controls.perks.disabled) {
        this.form.controls.perks.disable();
      }
    });

    this.form.controls.perks.valueChanges
      .subscribe((data) => {
        const oldAmountOfPerksUnlocked = _.clone(this.amountOfPerksUnlocked);
        this.countAmountOfPerksUnlocked();

        if (oldAmountOfPerksUnlocked > this.amountOfPerksUnlocked) {

        } else if (oldAmountOfPerksUnlocked < this.amountOfPerksUnlocked) {
          this.form.controls.challengeSuccesses.setValue([false, false, false]);
        }
      });
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
