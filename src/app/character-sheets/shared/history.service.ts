import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class HistoryService {

    constructor(
        private firestore: AngularFirestore
    ) {

    }

    addStatChange(charSheetId, statName, fromValue, toValue) {


    }
}
