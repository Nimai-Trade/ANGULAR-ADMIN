import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MastersMenusComponent } from './masters-menus.component';

describe('MastersMenusComponent', () => {
  let component: MastersMenusComponent;
  let fixture: ComponentFixture<MastersMenusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MastersMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
