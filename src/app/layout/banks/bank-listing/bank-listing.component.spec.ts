import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankListingComponent } from './bank-listing.component';

describe('BankListingComponent', () => {
  let component: BankListingComponent;
  let fixture: ComponentFixture<BankListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
