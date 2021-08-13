import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VasPlanListComponent } from './vas-plan-list.component';

describe('VasPlanListComponent', () => {
  let component: VasPlanListComponent;
  let fixture: ComponentFixture<VasPlanListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VasPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
