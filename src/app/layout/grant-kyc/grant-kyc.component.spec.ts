import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrantKycComponent } from './grant-kyc.component';

describe('GrantKycComponent', () => {
  let component: GrantKycComponent;
  let fixture: ComponentFixture<GrantKycComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
