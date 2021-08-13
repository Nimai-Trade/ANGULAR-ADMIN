import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentApprovalComponent } from './payment-approval.component';

describe('PaymentApprovalComponent', () => {
  let component: PaymentApprovalComponent;
  let fixture: ComponentFixture<PaymentApprovalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
