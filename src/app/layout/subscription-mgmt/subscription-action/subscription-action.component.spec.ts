import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubscriptionActionComponent } from './subscription-action.component';

describe('SubscriptionActionComponent', () => {
  let component: SubscriptionActionComponent;
  let fixture: ComponentFixture<SubscriptionActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
