import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrantRmComponent } from './grant-rm.component';

describe('GrantRmComponent', () => {
  let component: GrantRmComponent;
  let fixture: ComponentFixture<GrantRmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
