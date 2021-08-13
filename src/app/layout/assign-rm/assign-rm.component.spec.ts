import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignRmComponent } from './assign-rm.component';

describe('AssignRmComponent', () => {
  let component: AssignRmComponent;
  let fixture: ComponentFixture<AssignRmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
