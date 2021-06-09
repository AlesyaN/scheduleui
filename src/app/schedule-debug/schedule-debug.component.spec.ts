import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDebugComponent } from './schedule-debug.component';

describe('ScheduleDebugComponent', () => {
  let component: ScheduleDebugComponent;
  let fixture: ComponentFixture<ScheduleDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleDebugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
