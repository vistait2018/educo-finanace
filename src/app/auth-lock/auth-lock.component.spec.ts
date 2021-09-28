import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLockComponent } from './auth-lock.component';

describe('AuthLockComponent', () => {
  let component: AuthLockComponent;
  let fixture: ComponentFixture<AuthLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
