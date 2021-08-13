import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisplayFeatureDataComponent } from './display-feature-data.component';

describe('DisplayFeatureDataComponent', () => {
  let component: DisplayFeatureDataComponent;
  let fixture: ComponentFixture<DisplayFeatureDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFeatureDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFeatureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
