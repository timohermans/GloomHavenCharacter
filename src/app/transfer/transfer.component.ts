import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CharacterSheet} from '../character-sheet/character-sheet.class';
import {Observable, Subscription} from 'rxjs';
import {CharacterSheetService} from '../character-sheet/character-sheet.service';

import * as _ from 'lodash';
import {StorageService} from '../storage/storage.service';
import {DungeonStorageKey} from '../dungeon-counter/dungeon-counter.constants';
import {DungeonCounterData} from '../dungeon-counter/dungoen-counter.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {
  sheets: Observable<CharacterSheet[]>;
  firstSheetSelectionSubscription: Subscription;

  levels = [0, 1, 2, 3, 4, 5, 6, 7];
  selectedLevel: number;

  selectedSheet: CharacterSheet;
  counterData: DungeonCounterData;

  goldModifierPerLevel = {
    0: 2,
    1: 2,
    2: 3,
    3: 3,
    4: 4,
    5: 4,
    6: 5,
    7: 6
  };

  get goldModifier(): number {
    if (_.isNil(this.selectedLevel)) {
      return 0;
    }

    return this.goldModifierPerLevel[this.selectedLevel];
  }

  get totalExperiencePoints(): number {
    let experiencePoints = this.selectedSheet.experiencePoints;

    if (this.counterData) {
      experiencePoints += this.counterData.xp;
    }

    return experiencePoints;
  }

  get goldFromTokens(): number {
    return (this.counterData.tokens * this.goldModifier);
  }

  get totalGold(): number {
    let gold = this.selectedSheet.gold;

    if (this.counterData) {
      gold += this.goldFromTokens;
    }

    return gold;
  }

  get beforeTransferSheetLevel(): number {
    if (_.isNil(this.selectedSheet)) {
      return 0;
    }

    return this.characterSheetService.getLevelReachedBy(this.selectedSheet.experiencePoints);
  }

  get afterTransferSheetLevel(): number {
    if (_.isNil(this.selectedSheet)) {
      return 0;
    }

    return this.characterSheetService.getLevelReachedBy(this.totalExperiencePoints);
  }

  get isLevelUp(): boolean {
    return this.afterTransferSheetLevel > this.beforeTransferSheetLevel;
  }

  get isDataSaveable(): boolean {
    return !_.isNil(this.counterData) && !_.isNil(this.selectedSheet) && !_.isNil(this.selectedLevel);
  }

  constructor(
    private formBuilder: FormBuilder,
    private characterSheetService: CharacterSheetService,
    private storageService: StorageService,
    private router: Router) {}

  ngOnInit() {
    this.sheets = this.characterSheetService.getSheets();
    this.setupFirstSheetSelection();
    this.setupCounterData();
  }

  ngOnDestroy() {
    this.firstSheetSelectionSubscription.unsubscribe();
  }

  private setupFirstSheetSelection(): void {
    this.firstSheetSelectionSubscription = this.sheets.subscribe((sheets: CharacterSheet[]) => {
      if (!_.isEmpty(sheets) && _.isNil(this.selectedSheet)) {
        this.selectedSheet = _.first(sheets);
      }
    });
  }

  private setupCounterData(): void {
    const dungeonDataJson = sessionStorage.getItem(DungeonStorageKey);

    if (dungeonDataJson) {
      this.counterData = JSON.parse(dungeonDataJson) as DungeonCounterData;
    } else {
      this.counterData = {
        hp: 0,
        xp: 0,
        tokens: 0,
        kills: 0
      };
    }
  }

  updateSheet(): void {
    if (this.isDataSaveable) {
      const sheetToUpdate = _.cloneDeep(this.selectedSheet);
      sheetToUpdate.experiencePoints = this.totalExperiencePoints;
      sheetToUpdate.gold = this.totalGold;

      this.characterSheetService.update(sheetToUpdate)
        .then(() => {
          sessionStorage.removeItem(DungeonStorageKey);
          this.router.navigateByUrl(`/sheet/${this.selectedSheet.id}`);
        })
        .catch(() => {
          alert(`hier ging iets mis wat niet mis had mogen gaan :')`);
        });
    }
  }
}
