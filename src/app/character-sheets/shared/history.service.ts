import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {History} from './history.model';

@Injectable()
export class HistoryService {
  logsUrlSegment = 'logs/';

  constructor(
    private firestore: AngularFirestore
  ) {

  }

  addStatChange(charSheetId: string, statName: string, fromValue: string | number, toValue: string | number) {
    const characterLogs = this.firestore.collection<History>(`${this.logsUrlSegment}${charSheetId}`);
    characterLogs.add({
      date: new Date().toISOString(),
      statName: statName,
      fromValue: fromValue,
      toValue: toValue
    }).catch(error => {
      throw new Error(error);
    });
  }
}
