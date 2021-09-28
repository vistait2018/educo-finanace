import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPasswordEmailConfiramtionComponent } from './auth-password-email-confiramtion.component';

describe('AuthPasswordEmailConfiramtionComponent', () => {
  let component: AuthPasswordEmailConfiramtionComponent;
  let fixture: ComponentFixture<AuthPasswordEmailConfiramtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPasswordEmailConfiramtionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPasswordEmailConfiramtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
