import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TransferComponent} from './transfer.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {StorageService} from '../../shared/storage/storage.service';
import {CharacterSheetService} from '../../character-sheets/shared/character-sheet.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {of} from 'rxjs';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  let characterSheetServiceSpy: jasmine.SpyObj<CharacterSheetService>;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  const setupSpies = () => {
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
    // storageServiceSpy = jasmine.createSpyObj('StorageService');
    characterSheetServiceSpy = jasmine.createSpyObj('CharacterSheetService', ['getSheets']);
    characterSheetServiceSpy.getSheets.and.returnValue(of([]));
  };

  beforeEach(async(() => {
    setupSpies();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [TransferComponent],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreSpy},
        {provide: CharacterSheetService, useValue: characterSheetServiceSpy},
        {provide: StorageService, useValue: {currentUser: {}}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
