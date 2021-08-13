import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RightsListComponent } from './rights-list.component';

describe('RightsListComponent', () => {
  let component: RightsListComponent;
  let fixture: ComponentFixture<RightsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
