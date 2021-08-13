import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VasPlanAddComponent } from './vas-plan-add.component';

describe('VasPlanAddComponent', () => {
  let component: VasPlanAddComponent;
  let fixture: ComponentFixture<VasPlanAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VasPlanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
