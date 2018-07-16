import {TestBed} from '@angular/core/testing';

import {HistoryService} from './history.service';
import {AngularFirestore} from 'angularfire2/firestore';

describe('HistoryService', () => {
  let historyService: HistoryService;
  let firestorySpy: jasmine.SpyObj<AngularFirestore>;

  const setupSpies = () => {
    firestorySpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
  };


  beforeEach(() => {
    setupSpies();
    TestBed.configureTestingModule({
      providers: [
        HistoryService,
        {provide: firestorySpy, useValue: firestorySpy},
      ]
    });

    historyService = TestBed.get(HistoryService);
  });

  it('adds stat changes for a charactersheet to a seperate log', () => {
    historyService.addStatChange('abc', 'xp', 0, 10);

    expect(firestorySpy.doc).toHaveBeenCalledWith('abc');
  });
});

