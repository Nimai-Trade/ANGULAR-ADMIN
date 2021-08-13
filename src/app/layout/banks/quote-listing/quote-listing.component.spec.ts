import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuoteListingComponent } from './quote-listing.component';

describe('QuoteListingComponent', () => {
  let component: QuoteListingComponent;
  let fixture: ComponentFixture<QuoteListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
