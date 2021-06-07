import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationFormComponent } from './generation-form.component';

describe('GenerationFormComponent', () => {
  let component: GenerationFormComponent;
  let fixture: ComponentFixture<GenerationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
