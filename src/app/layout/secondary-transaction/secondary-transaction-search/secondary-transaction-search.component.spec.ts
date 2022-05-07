import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryTransactionSearchComponent } from './secondary-transaction-search.component';

describe('SecondaryTransactionSearchComponent', () => {
  let component: SecondaryTransactionSearchComponent;
  let fixture: ComponentFixture<SecondaryTransactionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryTransactionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryTransactionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
