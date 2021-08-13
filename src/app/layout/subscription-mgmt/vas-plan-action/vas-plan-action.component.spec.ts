import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VasPlanActionComponent } from './vas-plan-action.component';

describe('VasPlanActionComponent', () => {
  let component: VasPlanActionComponent;
  let fixture: ComponentFixture<VasPlanActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VasPlanActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasPlanActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
