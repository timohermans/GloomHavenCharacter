import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as _ from 'lodash';

import {CharacterSheetFactory, Character} from '../shared/character-sheet-template.factory';
import {Observable} from 'rxjs';
import {CharacterSheet} from '../shared/character-sheet.class';
import {StorageService} from '../../shared/storage/storage.service';
import {CharacterSheetService} from '../shared/character-sheet.service';

interface CharacterTemplate {
  character: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './character-sheet-list.component.html',
  styleUrls: ['./character-sheet-list.component.scss']
})
export class CharacterSheetListComponent implements OnInit {
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
