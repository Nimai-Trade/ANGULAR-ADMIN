import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectDepartmentComponent } from './select-department.component';

describe('SelectDepartmentComponent', () => {
  let component: SelectDepartmentComponent;
  let fixture: ComponentFixture<SelectDepartmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
