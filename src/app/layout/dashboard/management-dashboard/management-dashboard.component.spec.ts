import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManagementDashboardComponent } from './management-dashboard.component';

describe('ManagementDashboardComponent', () => {
  let component: ManagementDashboardComponent;
  let fixture: ComponentFixture<ManagementDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
