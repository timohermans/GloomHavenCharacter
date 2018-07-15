import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as _ from 'lodash';

import {CharacterSheetFactory, Character} from '../character-sheet/character-sheet-template.factory';
import {Observable} from 'rxjs';
import {CharacterSheet} from '../character-sheet/character-sheet.class';
import {StorageService} from '../storage/storage.service';
import {CharacterSheetService} from '../character-sheet/character-sheet.service';

interface CharacterTemplate {
  character: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent implements OnInit {
  isSheetCreationOpen = false;
  characterTemplates: CharacterTemplate[] = [];
  sheetsCollection: AngularFirestoreCollection<CharacterSheet>;
  sheets: Observable<CharacterSheet[]>;

  constructor(
    private db: AngularFirestore,
    private storageService: StorageService,
    private characterSheetService: CharacterSheetService) {}

  ngOnInit() {
    this.sheets = this.characterSheetService.getSheets();

    for (const character of _.keys(Character)) {
      if (isNaN(+character)) {
        this.characterTemplates.push({
          character,
        });
      }
    }

    console.log(this.characterTemplates);
  }

  public getRouterLinkWith(sheet: CharacterSheet) {
    return `/sheet/${sheet.id}`;
  }

  public addSheet(character: string) {
    const sheet = CharacterSheetFactory.buildSheet(Character[character]);
    sheet.email = this.storageService.currentUser.email;

    this.characterSheetService.add(sheet);
    this.isSheetCreationOpen = false;
  }
}
