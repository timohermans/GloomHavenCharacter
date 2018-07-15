import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StorageService} from '../storage/storage.service';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  const setupSpies = () => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['login', 'watchAuthChanges']);
    storageServiceSpy.watchAuthChanges.and.returnValue(of(null));
  };
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(async(() => {
    setupSpies();
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent],
      providers: [
        {provide: StorageService, useValue: storageServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
