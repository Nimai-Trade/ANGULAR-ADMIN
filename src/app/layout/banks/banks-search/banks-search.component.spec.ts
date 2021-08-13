import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BanksSearchComponent } from './banks-search.component';

describe('BanksSearchComponent', () => {
  let component: BanksSearchComponent;
  let fixture: ComponentFixture<BanksSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
