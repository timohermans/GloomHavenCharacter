import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DungeonCounterComponent} from './dungeon-counter.component';
import {ConfirmButtonMockComponent} from '../common/confirm-button/confirm-button.component.mock';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CustomCounterComponent} from '../character-sheet/custom-counter/counter.component';

describe('DungeonCounterComponent', () => {
  let component: DungeonCounterComponent;
  let fixture: ComponentFixture<DungeonCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        DungeonCounterComponent,
        ConfirmButtonMockComponent,
        CustomCounterComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
