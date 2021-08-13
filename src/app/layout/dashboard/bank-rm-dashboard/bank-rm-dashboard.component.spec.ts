import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankRmDashboardComponent } from './bank-rm-dashboard.component';

describe('BankRmDashboardComponent', () => {
  let component: BankRmDashboardComponent;
  let fixture: ComponentFixture<BankRmDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
