import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundCreditComponent } from './refund-credit.component';

describe('RefundCreditComponent', () => {
  let component: RefundCreditComponent;
  let fixture: ComponentFixture<RefundCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
