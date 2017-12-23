import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilKeyChanged} from 'rxjs/operators/distinctUntilKeyChanged';
import * as _ from 'lodash';

import {CharacterSheet} from './character-sheet.class';
import {Perk} from './perk.class';

import {animations} from './character-sheet.animations';
import {CharacterSheetFactory, Character} from './character-sheet-template.factory';
import {AngularFirestoreDocument, AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
  animations: animations
})
export class CharacterSheetComponent implements OnInit {
  currentTabName = 'general';

  private characterSheetDoc: AngularFirestoreDocument<CharacterSheet>;
  characterSheet: CharacterSheet;

  private entireFormChangeSubscription: Subscription;
  private perkFormChangeSubscription: Subscription;

  form: FormGroup;
  xpPerLevel: number[];

  private amountOfPerksUnlocked = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private db: AngularFirestore) {}

  ngOnInit() {
    this.buildSheetForm();
    this.initExperiencePerLevel();
    this.countAmountOfPerksUnlocked();
    this.loadDataFromParam();
  }

  private loadDataFromParam() {
    this.route.paramMap.flatMap(params => {
      const docId = params.get('id');
      this.characterSheetDoc = this.db.doc<CharacterSheet>(`sheets/${docId}`);
      return this.characterSheetDoc
        .valueChanges();
    })
      .subscribe(sheet => {
        this.characterSheet = sheet;
        this.loadDataIntoForm();
        this.setupFormValueChanges();
      });
  }

  private buildSheetForm() {
    this.form = this.formBuilder.group({
      title: '',
      name: ['', Validators.required],
      experiencePoints: [0, Validators.required],
      experiencePointsNotes: [''],
      gold: [0],
      itemNotes: [''],
      email: [''],
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
    this.entireFormChangeSubscription = this.form.valueChanges
      .debounceTime(500)
      .filter(data => {
        return !_.isEqual(data, this.characterSheet);
      })
      .subscribe((data) => {
        this.characterSheetDoc.update(data);
      });

    this.perkFormChangeSubscription = this.form.controls.perks.valueChanges
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
      title: this.characterSheet.title,
      name: this.characterSheet.name,
      experiencePoints: this.characterSheet.experiencePoints,
      experiencePointsNotes: this.characterSheet.experiencePointsNotes,
      gold: this.characterSheet.gold,
      itemNotes: this.characterSheet.itemNotes,
      email: this.characterSheet.email
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

  calculateXpArrowPosition() {
    const base = -1;
    const positionModifier = 0.664;
    const xp = this.form.controls.experiencePoints.value;

    const position = base + (positionModifier * xp);

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
