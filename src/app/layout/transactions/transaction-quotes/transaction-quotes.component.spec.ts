import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransactionQuotesComponent } from './transaction-quotes.component';

describe('TransactionQuotesComponent', () => {
  let component: TransactionQuotesComponent;
  let fixture: ComponentFixture<TransactionQuotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
