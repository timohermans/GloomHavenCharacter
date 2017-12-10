import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CharacterSheetComponent } from './character-sheet.component';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomCounterComponent } from './custom-counter/counter.component';

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

    // click('.perks .perk:nth-child(1)');

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

    const model = component.form.value;

    expect(model).toEqual({
      name: 'hallo!',
      experiencePoints: -5,
      experiencePointsNotes: '20 > 30',
      gold: 1,
      itemNotes: 'Great sword (+1)'
      // ,
      // perks: [
      //   {
      //     hasObtained: true,
      //     description: 'Remove two \'-1\' cards'
      //   }
      // ]
    });
  });

  function fillIn(cssQuery, valueToFill) {
    const inputElement = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLInputElement;
    inputElement.value = valueToFill;
    inputElement.dispatchEvent(new Event('input'));
  }

  function click(cssQuery) {
    const clickableElement = fixture.debugElement.query(By.css(cssQuery)).nativeElement as HTMLButtonElement;
    clickableElement.dispatchEvent(new Event('click'));
  }

});
