import {TestBed} from '@angular/core/testing';

import {HistoryService} from './history.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

describe('HistoryService', () => {
  let historyService: HistoryService;
  let firestorySpy: jasmine.SpyObj<AngularFirestore>;
  let historyCollectionSpy: jasmine.SpyObj<AngularFirestoreCollection>;

  const setupSpies = () => {
    firestorySpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    historyCollectionSpy = jasmine.createSpyObj('AngularFirestoreCollection', ['add']);

    firestorySpy.collection.and.returnValue(historyCollectionSpy);
    historyCollectionSpy.add.and.returnValue(Promise.resolve());
  };


  beforeEach(() => {
    setupSpies();
    TestBed.configureTestingModule({
      providers: [
        HistoryService,
        {provide: AngularFirestore, useValue: firestorySpy},
      ]
    });

    historyService = TestBed.get(HistoryService);
  });

  it('adds stat changes for a charactersheet to a seperate log', () => {
    const charSheetId = 'abc';
    const statName = 'xp';
    const fromValue = 0;
    const toValue = 10;

    historyService.addStatChange(charSheetId, statName, fromValue, toValue);

    expect(firestorySpy.collection).toHaveBeenCalledWith('logs/abc');
    expect(historyCollectionSpy.add).toHaveBeenCalledWith({
      date: jasmine.any(String),
      toValue: toValue,
      fromValue: fromValue,
      statName: statName
    });
  });
});

