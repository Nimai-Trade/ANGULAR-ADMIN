import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGrantComponent } from './employee-grant.component';

describe('EmployeeGrantComponent', () => {
  let component: EmployeeGrantComponent;
  let fixture: ComponentFixture<EmployeeGrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeGrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
