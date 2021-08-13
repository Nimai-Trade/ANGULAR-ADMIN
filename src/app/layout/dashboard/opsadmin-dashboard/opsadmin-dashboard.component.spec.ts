import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpsadminDashboardComponent } from './opsadmin-dashboard.component';

describe('OpsadminDashboardComponent', () => {
  let component: OpsadminDashboardComponent;
  let fixture: ComponentFixture<OpsadminDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
