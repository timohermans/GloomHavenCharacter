import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as _ from 'lodash';

import {Player} from './player.interface';
import {CharacterSheetFactory, Character} from '../character-sheet/character-sheet-template.factory';
import {Observable} from 'rxjs/Observable';
import {CharacterSheet} from '../character-sheet/character-sheet.class';
import {StorageService} from '../storage/storage.service';

interface CharacterTemplate {
  character: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  isSheetCreationOpen = false;
  characterTemplates: CharacterTemplate[] = [];
  sheetsCollection: AngularFirestoreCollection<CharacterSheet>;
  sheets: Observable<CharacterSheet[]>;

  constructor(private db: AngularFirestore, private storageService: StorageService) {}

  ngOnInit() {
    this.sheetsCollection = this.db.collection<CharacterSheet>(
      'sheets',
      ref => ref.where('email', '==', this.storageService.userLoggedIn.email));

    this.sheets = this.sheetsCollection.valueChanges();

    for (const character of _.keys(Character)) {
      if (isNaN(+character)) {
        this.characterTemplates.push({
          character,
        });
      }
    }

    console.log(this.characterTemplates);
  }

  public getRouterLinkWith(player: Player) {
    // return `/sheet/${player.id}`;
    return `/sheet`;
  }

  public addSheet(character: string) {
    const sheet = CharacterSheetFactory.buildSheet(Character[character]);
    sheet.email = this.storageService.userLoggedIn.email;

    this.sheetsCollection.add(sheet);
    this.isSheetCreationOpen = false;
  }
}
