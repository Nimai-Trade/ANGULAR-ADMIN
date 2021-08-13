import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentPlanDetailsComponent } from './payment-plan-details.component';

describe('PaymentPlanDetailsComponent', () => {
  let component: PaymentPlanDetailsComponent;
  let fixture: ComponentFixture<PaymentPlanDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPlanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
