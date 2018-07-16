import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore';
import {CharacterSheet} from './character-sheet.class';
import {Observable, BehaviorSubject} from 'rxjs';
import {StorageService} from '../../shared/storage/storage.service';
import {map} from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable()
export class CharacterSheetService {
  private sheetsCollection: AngularFirestoreCollection<CharacterSheet>;
  private sheetsStore: BehaviorSubject<CharacterSheet[]> = new BehaviorSubject<CharacterSheet[]>([]);
  private xpPerLevel = [0, 45, 95, 150, 210, 275, 345, 420, 500];

  constructor(private storageService: StorageService, private db: AngularFirestore) {
    this.init();
  }

  init() {
    this.sheetsCollection = this.db.collection<CharacterSheet>(
      'sheets', ref => ref.where('email', '==', this.storageService.currentUser.email));

    this.watchExternalDbChanges();
  }

  private watchExternalDbChanges() {
    this.sheetsCollection
      .snapshotChanges()
      .pipe(
        map(values => {
          return values.map(value => {
            const data = value.payload.doc.data() as CharacterSheet;
            data.id = value.payload.doc.id;
            return data;
          });
        })
      )
      .subscribe((characters: CharacterSheet[]) => {
        if (this.sheetsStore.observers.length > 0) {
          console.log(`going to notify ${this.sheetsStore.observers.length} observers about sheet changes`);
        }

        this.sheetsStore.next(characters);
      });
  }

  getSheets(): Observable<CharacterSheet[]> {
    return this.sheetsStore.asObservable();
  }

  add(sheet: CharacterSheet) {
    this.sheetsCollection.add(sheet);
  }

  update(sheet: CharacterSheet) {
    const sheetDoc = this.db.doc<CharacterSheet>(`sheets/${sheet.id}`);

    if (!_.isNil(sheetDoc)) {
      return sheetDoc.update(sheet);
    } else {
      return Promise.reject('Sheet not found in DB');
    }
  }

  getLevelReachedBy(xp: number): number {
    let levelReached = 0;

    _.each(this.xpPerLevel, (xpRequired: number, index: number) => {
      if (xp >= xpRequired) {
        levelReached += 1;
      }
    });

    return levelReached;
  }
}
