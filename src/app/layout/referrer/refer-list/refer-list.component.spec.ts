import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferListComponent } from './refer-list.component';

describe('ReferListComponent', () => {
  let component: ReferListComponent;
  let fixture: ComponentFixture<ReferListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
