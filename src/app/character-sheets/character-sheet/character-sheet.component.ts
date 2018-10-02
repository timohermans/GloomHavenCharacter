import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {flatMap, debounceTime, filter} from 'rxjs/operators';
import * as _ from 'lodash';

import {CharacterSheet} from '../shared/character-sheet.class';

import {animations} from './character-sheet.animations';
import {AngularFirestoreDocument, AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
  animations: animations,
})
export class CharacterSheetComponent implements OnInit {
  currentTabName = 'general';

  form: FormGroup;
  characterSheet: CharacterSheet;

  private characterSheetDoc: AngularFirestoreDocument<CharacterSheet>;
  private isSheetChangedFromInsideApplication = false;

  private entireFormChangeSubscription: Subscription;
  private perkFormChangeSubscription: Subscription;

  private amountOfPerksUnlocked = 0;
  xpPerLevel: number[];

  public get challengeSuccessFormArray(): FormArray {
    return this.form.controls.challengeSuccesses as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.buildSheetForm();
    this.initExperiencePerLevel();
    this.countAmountOfPerksUnlocked();
    this.loadDataFromParam();
    this.setupFormValueChanges();
  }

  private loadDataFromParam() {
    this.route.paramMap
      .pipe(
        flatMap(params => {
          const docId = params.get('id');
          this.characterSheetDoc = this.db.doc<CharacterSheet>(`sheets/${docId}`);
          return this.characterSheetDoc.valueChanges();
        })
      )
      .subscribe(sheet => {
        if (!this.isSheetChangedFromInsideApplication) {
          this.characterSheet = sheet as CharacterSheet;
          this.loadDataIntoForm();
        } else {
          this.isSheetChangedFromInsideApplication = false;
        }
      });
  }

  private buildSheetForm() {
    this.form = this.formBuilder.group({
      title: 'sheet',
      name: ['', Validators.required],
      experiencePoints: [0, Validators.required],
      experiencePointsNotes: [''],
      gold: [0],
      itemNotes: [''],
      email: [''],
      perks: this.formBuilder.array([]),
      challengeSuccesses: this.formBuilder.array([false, false, false]),
    });
  }

  private initExperiencePerLevel() {
    this.xpPerLevel = [0, 45, 95, 150, 210, 275, 345, 420, 500];
  }

  private countAmountOfPerksUnlocked() {
    this.amountOfPerksUnlocked = 0;
    const perks = this.form.controls.perks.value;

    _.each(perks, perk => {
      if (perk.hasObtained) {
        this.amountOfPerksUnlocked += 1;
      }
    });
  }

  private setupFormValueChanges() {
    this.entireFormChangeSubscription = this.form.valueChanges
      .pipe(
        debounceTime(500),
        filter(data => {
          return !_.isEqual(data, this.characterSheet);
        })
      )
      .subscribe(data => {
        this.isSheetChangedFromInsideApplication = true;
        this.characterSheetDoc.update(data);
      });
  }

  private loadDataIntoForm() {
    if (!this.characterSheet) {
      return;
    }

    this.form.patchValue({
      title: this.characterSheet.title,
      name: this.characterSheet.name,
      experiencePoints: this.characterSheet.experiencePoints,
      experiencePointsNotes: this.characterSheet.experiencePointsNotes,
      gold: this.characterSheet.gold,
      itemNotes: this.characterSheet.itemNotes,
      email: this.characterSheet.email,
    });

    if (this.characterSheet.challengeSuccesses) {
      this.createChallengeSuccessesForm(this.characterSheet.challengeSuccesses);
    }

    if (this.characterSheet.perks) {
      const perks = this.characterSheet.perks.map(perk => this.formBuilder.group(perk));
      const perksFormArray = this.formBuilder.array(perks);
      this.form.setControl('perks', perksFormArray);
    }
  }

  private createChallengeSuccessesForm(challengeSuccesses: boolean[]): void {
    if (_.every(challengeSuccesses, success => success === true)) {
      challengeSuccesses = [...challengeSuccesses, false];
    }

    const challengeSuccessesFormArray = this.formBuilder.array(challengeSuccesses);
    this.form.setControl('challengeSuccesses', challengeSuccessesFormArray);

    if (this.perkFormChangeSubscription) {
      this.perkFormChangeSubscription.unsubscribe();
    }

    this.perkFormChangeSubscription = this.form.controls.challengeSuccesses.valueChanges.subscribe(
      successes => {
        this.createChallengeSuccessesForm(successes);
      }
    );
  }

  public get isUnableToUnlockPerk() {
    return _.some(this.form.controls.challengeSuccesses.value, isChecked => isChecked === false);
  }

  hasCurrentLevelWith(xp: number, levelIndex: number) {
    const level = levelIndex + 1;

    // TODO: use the character sheet service
    let levelReached = 0;

    _.each(this.xpPerLevel, (xpRequired: number) => {
      if (xp >= xpRequired) {
        levelReached += 1;
      }
    });

    return level === levelReached;
  }

  calculateXpArrowPosition() {
    const base = -1;
    const positionModifier = 0.664;
    const xp = this.form.controls.experiencePoints.value;

    const position = base + positionModifier * xp;

    return `${position}px`;
  }

  isCurrent(tabName) {
    return tabName === this.currentTabName;
  }

  getStateFrom(tabName) {
    if (tabName === this.currentTabName) {
      return 'active';
    }

    return 'inactive';
  }
}
