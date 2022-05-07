import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryTransactionListComponent } from './secondary-transaction-list.component';

describe('SecondaryTransactionListComponent', () => {
  let component: SecondaryTransactionListComponent;
  let fixture: ComponentFixture<SecondaryTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
