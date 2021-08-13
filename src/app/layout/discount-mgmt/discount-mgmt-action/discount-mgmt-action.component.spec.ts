import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiscountMgmtActionComponent } from './discount-mgmt-action.component';

describe('DiscountMgmtActionComponent', () => {
  let component: DiscountMgmtActionComponent;
  let fixture: ComponentFixture<DiscountMgmtActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountMgmtActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountMgmtActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
