import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryQuotesDetailsComponent } from './secondary-quotes-details.component';

describe('SecondaryQuotesDetailsComponent', () => {
  let component: SecondaryQuotesDetailsComponent;
  let fixture: ComponentFixture<SecondaryQuotesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryQuotesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryQuotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
