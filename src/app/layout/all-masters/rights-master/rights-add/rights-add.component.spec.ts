import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RightsAddComponent } from './rights-add.component';

describe('RightsAddComponent', () => {
  let component: RightsAddComponent;
  let fixture: ComponentFixture<RightsAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
