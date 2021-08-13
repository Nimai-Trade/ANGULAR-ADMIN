import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreviewcouponComponent } from './previewcoupon.component';

describe('PreviewcouponComponent', () => {
  let component: PreviewcouponComponent;
  let fixture: ComponentFixture<PreviewcouponComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewcouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
