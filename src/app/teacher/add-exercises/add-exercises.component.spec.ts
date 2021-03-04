import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExercisesComponent } from './add-exercises.component';

describe('AddExercisesComponent', () => {
  let component: AddExercisesComponent;
  let fixture: ComponentFixture<AddExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExercisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
