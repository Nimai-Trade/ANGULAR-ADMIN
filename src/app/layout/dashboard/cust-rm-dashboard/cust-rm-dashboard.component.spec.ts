import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustRmDashboardComponent } from './cust-rm-dashboard.component';

describe('CustRmDashboardComponent', () => {
  let component: CustRmDashboardComponent;
  let fixture: ComponentFixture<CustRmDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustRmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustRmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
