import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubscriptionAddComponent } from './subscription-add.component';

describe('SubscriptionAddComponent', () => {
  let component: SubscriptionAddComponent;
  let fixture: ComponentFixture<SubscriptionAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
