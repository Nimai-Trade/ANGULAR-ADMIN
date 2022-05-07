import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryTransactionQuotesComponent } from './secondary-transaction-quotes.component';

describe('SecondaryTransactionQuotesComponent', () => {
  let component: SecondaryTransactionQuotesComponent;
  let fixture: ComponentFixture<SecondaryTransactionQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryTransactionQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryTransactionQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
