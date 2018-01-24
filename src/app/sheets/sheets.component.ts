import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as _ from 'lodash';

import {CharacterSheetFactory, Character} from '../character-sheet/character-sheet-template.factory';
import {Observable} from 'rxjs/Observable';
import {CharacterSheet} from '../character-sheet/character-sheet.class';
import { StorageService } from '../storage/storage.service';

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

  constructor(private db: AngularFirestore, private storageService: StorageService) {}

  ngOnInit() {
    this.sheetsCollection = this.db.collection<CharacterSheet>(
      'sheets',
      ref => ref.where('email', '==', this.storageService.currentUser.email));

    this.sheets = this.sheetsCollection
                    .snapshotChanges()
                    .map(values => {
                      return values.map(value => {
                        const data = value.payload.doc.data() as CharacterSheet;
                        data.id = value.payload.doc.id;
                        return data;
                      });
                    });


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

    this.sheetsCollection.add(sheet);
    this.isSheetCreationOpen = false;
  }
}
