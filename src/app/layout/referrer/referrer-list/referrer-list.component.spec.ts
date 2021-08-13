import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferrerListComponent } from './referrer-list.component';

describe('ReferrerListComponent', () => {
  let component: ReferrerListComponent;
  let fixture: ComponentFixture<ReferrerListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
