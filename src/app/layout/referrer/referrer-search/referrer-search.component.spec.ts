import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferrerSearchComponent } from './referrer-search.component';

describe('ReferrerSearchComponent', () => {
  let component: ReferrerSearchComponent;
  let fixture: ComponentFixture<ReferrerSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
