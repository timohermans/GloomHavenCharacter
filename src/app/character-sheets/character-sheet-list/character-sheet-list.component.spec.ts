import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {CharacterSheetListComponent} from './character-sheet-list.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {StorageService} from '../../shared/storage/storage.service';
import {CharacterSheetService} from '../shared/character-sheet.service';
import {of} from 'rxjs';

describe('PlayersComponent', () => {

  let characterSheetServiceSpy: jasmine.SpyObj<CharacterSheetService>;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  const setupSpies = () => {
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
    characterSheetServiceSpy = jasmine.createSpyObj('CharacterSheetService', ['getSheets']);
    characterSheetServiceSpy.getSheets.and.returnValue(of([]));
  };
  let component: CharacterSheetListComponent;
  let fixture: ComponentFixture<CharacterSheetListComponent>;

  beforeEach(async(() => {
    setupSpies();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          {path: '', component: CharacterSheetListComponent, pathMatch: 'full'},
          {path: 'sheets', component: CharacterSheetListComponent},
          {path: 'sheet/:id', component: CharacterSheetListComponent}
        ]
      )],
      declarations: [CharacterSheetListComponent],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreSpy},
        {provide: CharacterSheetService, useValue: characterSheetServiceSpy},
        {provide: StorageService, useValue: {currentUser: {}}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
