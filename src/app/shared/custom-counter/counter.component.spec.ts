import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CustomCounterComponent;
  let fixture: ComponentFixture<CustomCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
