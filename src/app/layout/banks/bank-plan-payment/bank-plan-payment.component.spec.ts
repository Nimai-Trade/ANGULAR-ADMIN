import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankPlanPaymentComponent } from './bank-plan-payment.component';

describe('BankPlanPaymentComponent', () => {
  let component: BankPlanPaymentComponent;
  let fixture: ComponentFixture<BankPlanPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankPlanPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankPlanPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
