import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubscriptionViewComponent } from './subscription-view.component';

describe('SubscriptionViewComponent', () => {
  let component: SubscriptionViewComponent;
  let fixture: ComponentFixture<SubscriptionViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
