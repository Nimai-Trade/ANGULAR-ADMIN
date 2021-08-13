import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankTrxnDetailsComponent } from './bank-trxn-details.component';

describe('BankTrxnDetailsComponent', () => {
  let component: BankTrxnDetailsComponent;
  let fixture: ComponentFixture<BankTrxnDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTrxnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTrxnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
