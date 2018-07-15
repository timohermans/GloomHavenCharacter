import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {SheetsComponent} from './sheets.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {StorageService} from '../storage/storage.service';
import {CharacterSheetService} from '../character-sheet/character-sheet.service';
import {of} from 'rxjs';

describe('PlayersComponent', () => {

  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let characterSheetServiceSpy: jasmine.SpyObj<CharacterSheetService>;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  const setupSpies = () => {
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
    // storageServiceSpy = jasmine.createSpyObj('StorageService');
    characterSheetServiceSpy = jasmine.createSpyObj('CharacterSheetService', ['getSheets']);
    characterSheetServiceSpy.getSheets.and.returnValue(of([]));
  };
  let component: SheetsComponent;
  let fixture: ComponentFixture<SheetsComponent>;

  beforeEach(async(() => {
    setupSpies();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: '', component: SheetsComponent, pathMatch: 'full'},
          {path: 'sheets', component: SheetsComponent},
          {path: 'sheet/:id', component: SheetsComponent}
        ]
      )],
      declarations: [SheetsComponent],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreSpy},
        {provide: CharacterSheetService, useValue: characterSheetServiceSpy},
        {provide: StorageService, useValue: {currentUser: {}}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
