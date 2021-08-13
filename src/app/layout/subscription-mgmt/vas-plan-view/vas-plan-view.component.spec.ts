import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VasPlanViewComponent } from './vas-plan-view.component';

describe('VasPlanViewComponent', () => {
  let component: VasPlanViewComponent;
  let fixture: ComponentFixture<VasPlanViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VasPlanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
