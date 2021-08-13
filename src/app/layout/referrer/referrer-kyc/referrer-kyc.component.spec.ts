import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferrerKycComponent } from './referrer-kyc.component';

describe('ReferrerKycComponent', () => {
  let component: ReferrerKycComponent;
  let fixture: ComponentFixture<ReferrerKycComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
