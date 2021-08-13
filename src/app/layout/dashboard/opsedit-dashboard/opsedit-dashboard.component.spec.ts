import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpseditDashboardComponent } from './opsedit-dashboard.component';

describe('OpseditDashboardComponent', () => {
  let component: OpseditDashboardComponent;
  let fixture: ComponentFixture<OpseditDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpseditDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpseditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
