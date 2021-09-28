import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSessionsComponent } from './school-sessions.component';

describe('SchoolSessionsComponent', () => {
  let component: SchoolSessionsComponent;
  let fixture: ComponentFixture<SchoolSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
