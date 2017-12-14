import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CharacterSheetComponent} from './character-sheet.component';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CustomCounterComponent} from './custom-counter/counter.component';

import * as _ from 'lodash';

describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CharacterSheetComponent, CustomCounterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a \'sheet\' as title', () => {
    const titleElement = debugElement.query(By.css('h1')).nativeElement as HTMLHeadElement;
    expect(titleElement.textContent).toBe('sheet');
  });

  it('should not have a valid form when entering page', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should only be possible to click a perk when unlocked', () => {
    const firstPerkQuery = '[formArrayName="perks"] .perk input[type="checkbox"]:nth-child(1)';
    expect(isDisabled(firstPerkQuery)).toBeTruthy('must be disabled without unlocking');

    check('[formArrayName="challengeSuccesses"] div:nth-child(1) input');
    check('[formArrayName="challengeSuccesses"] div:nth-child(2) input');
    check('[formArrayName="challengeSuccesses"] div:nth-child(3) input');

    fixture.detectChanges();

    expect(isDisabled(firstPerkQuery)).toBeFalsy();

    check(firstPerkQuery);

    fixture.detectChanges();

    const perkUnlock1 = getNativeElement('[formArrayName="challengeSuccesses"] div:nth-child(1) input') as HTMLInputElement;
    const perkUnlock2 = getNativeElement('[formArrayName="challengeSuccesses"] div:nth-child(2) input') as HTMLInputElement;
    const perkUnlock3 = getNativeElement('[formArrayName="challengeSuccesses"] div:nth-child(3) input') as HTMLInputElement;

    expect(perkUnlock1.checked).toBeFalsy();
    expect(perkUnlock2.checked).toBeFalsy();
    expect(perkUnlock3.checked).toBeFalsy();
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

    check('[formArrayName="challengeSuccesses"] div:nth-child(1) input');
    check('[formArrayName="challengeSuccesses"] div:nth-child(2) input');
    check('[formArrayName="challengeSuccesses"] div:nth-child(3) input');

    check('[formArrayName="perks"] .perk:nth-child(1) input[type="checkbox"]:nth-child(1)');

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

    const model = component.form.value;

    expect(model).toEqual({
      name: 'hallo!',
      experiencePoints: -5,
      experiencePointsNotes: '20 > 30',
      gold: 1,
      itemNotes: 'Great sword (+1)',
      perks: [
        {
          hasObtained: true,
          description: 'Remove two \'-1\' cards'
        }
      ],
      challengeSuccesses: [false, false, false]
    });
  });

  it('should show the appropriate level when gaining experience', () => {
    const currentLevelCssQuery = '#levels .current-level';
    const xpPlus5CssQuery = '[formControlName="experiencePoints"] .value-5';
    hasText('1', currentLevelCssQuery);

    for (let i = 0; i < 9; i += 1) {
      click(xpPlus5CssQuery);
    }

    fixture.detectChanges();

    hasText('2', currentLevelCssQuery);
  });

  function hasText(text: string, cssQuery: string) {
    const inputElement = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLElement;
    expect(_.trim(inputElement.innerHTML, '\r\n ')).toBe(text);
  }

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
