import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferDetailsComponent } from './refer-details.component';

describe('ReferDetailsComponent', () => {
  let component: ReferDetailsComponent;
  let fixture: ComponentFixture<ReferDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
