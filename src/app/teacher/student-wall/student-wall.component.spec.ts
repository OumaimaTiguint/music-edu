import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWallComponent } from './student-wall.component';

describe('StudentWallComponent', () => {
  let component: StudentWallComponent;
  let fixture: ComponentFixture<StudentWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
