import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankQuoteDetailComponent } from './bank-quote-detail.component';

describe('BankQuoteDetailComponent', () => {
  let component: BankQuoteDetailComponent;
  let fixture: ComponentFixture<BankQuoteDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankQuoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankQuoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
