import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonCounterComponent } from './dungeon-counter.component';

describe('DungeonCounterComponent', () => {
  let component: DungeonCounterComponent;
  let fixture: ComponentFixture<DungeonCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DungeonCounterComponent ]
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
