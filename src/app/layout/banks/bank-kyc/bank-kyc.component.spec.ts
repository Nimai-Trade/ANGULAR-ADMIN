import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankKycComponent } from './bank-kyc.component';

describe('BankKycComponent', () => {
  let component: BankKycComponent;
  let fixture: ComponentFixture<BankKycComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
