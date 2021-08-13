import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransactionsSearchComponent } from './transactions-search.component';

describe('TransactionsSearchComponent', () => {
  let component: TransactionsSearchComponent;
  let fixture: ComponentFixture<TransactionsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
