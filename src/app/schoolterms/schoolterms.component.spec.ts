import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooltermsComponent } from './schoolterms.component';

describe('SchooltermsComponent', () => {
  let component: SchooltermsComponent;
  let fixture: ComponentFixture<SchooltermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchooltermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooltermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
