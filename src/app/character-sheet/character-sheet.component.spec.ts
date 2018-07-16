import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CharacterSheetComponent} from './character-sheet.component';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CustomCounterComponent} from './custom-counter/counter.component';

import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Page} from './character-sheet.component.spec.page';
import {HistoryMockComponent} from './history/history.component.mock';
import { HistoryService } from './shared/history.service';

describe('CharacterSheetComponent', () => {
  const routeParams = {paramMap: of({id: '123'})};

  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let historyService: jasmine.SpyObj<HistoryService>;
  const setupSpies = () => {
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
    historyService = jasmine.createSpyObj('HistoryService', ['addStatChange']);
  };
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;
  let page: Page;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    setupSpies();

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        CharacterSheetComponent,
        HistoryMockComponent,
        CustomCounterComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: routeParams},
        {provide: AngularFirestore, useValue: angularFirestoreSpy},
        {provide: HistoryService, useValue: historyService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a \'sheet\' as title', () => {
    const titleElement = debugElement.query(By.css('[data-test-id="sheetTitle"]')).nativeElement as HTMLHeadElement;
    expect(titleElement.textContent).toBe('sheet');
  });

  it('should not have a valid form when entering page', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should have a valid form when everythign filled in', () => {
    fillIn('input[formControlName="name"]', 'hallo!');

    click('[formControlName="experiencePoints"] .value-1');
    click('[formControlName="experiencePoints"] .value-5');
    click('[formControlName="experiencePoints"] .value-m-1');
    click('[formControlName="experiencePoints"] .value-m-5');
    click('[formControlName="experiencePoints"] .value-m-5');

    fillIn('textarea[formControlName="experiencePointsNotes"]', '20 > 30');

    click('[formControlName="gold"] .value-1');
    click('[formControlName="gold"] .value-5');
    click('[formControlName="gold"] .value-m-1');
    click('[formControlName="gold"] .value-m-5');
    click('[formControlName="gold"] .value-1');

    fillIn('textarea[formControlName="itemNotes"]', 'Great sword (+1)');

    // check('[formArrayName="perks"] .perk:nth-child(1) input[type="checkbox"]:nth-child(1)');

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

    const model = component.form.value;

    expect(model).toEqual({
      title: 'sheet',
      email: '',
      name: 'hallo!',
      experiencePoints: -5,
      experiencePointsNotes: '20 > 30',
      gold: 1,
      itemNotes: 'Great sword (+1)',
      challengeSuccesses: [false, false, false],
      perks: []
    });
  });

  it('should show the appropriate level when gaining experience', () => {
    expect(_.trim(page.currentLevelLabel.innerHTML, '\r\n ')).toBe('1');

    for (let i = 0; i < 9; i += 1) {
      page.xpPlusFive.click();
    }

    fixture.detectChanges();

    expect(_.trim(page.currentLevelLabel.innerHTML, '\r\n ')).toBe('2');
  });

  it('can switch to the log tab', () => {
    page.logTab.click();

    fixture.detectChanges();

    expect(page.logComponent).toBeTruthy();
  });

  it('adds a stat change when something changes', fakeAsync(() => {
      page.xpPlusFive.click();
      page.xpPlusFive.click();

      tick(500);
      fixture.detectChanges();

      expect(historyService.addStatChange).toHaveBeenCalledWith('xp', 0, 10);
  }));

  function fillIn(cssQuery, valueToFill) {
    const inputElement = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLInputElement;
    inputElement.value = valueToFill;
    inputElement.dispatchEvent(new Event('input'));
  }

  function click(cssQuery: string) {
    const clickableElement = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLButtonElement;
    clickableElement.dispatchEvent(new Event('click'));
  }

  function check(cssQuery: string) {
    const clickableElement = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLInputElement;
    clickableElement.checked = !clickableElement.checked;
    clickableElement.dispatchEvent(new Event('change'));
  }

  function getNativeElement(cssQuery: string) {
    return fixture.debugElement.query(By.css(cssQuery)).nativeElement;
  }

  function isDisabled(cssQuery: string): boolean {
    const input = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLInputElement;

    return input.disabled;
  }

});
