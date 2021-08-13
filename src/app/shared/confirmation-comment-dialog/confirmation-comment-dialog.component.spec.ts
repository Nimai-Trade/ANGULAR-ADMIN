import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmationCommentDialogComponent } from './confirmation-comment-dialog.component';

describe('ConfirmationCommentDialogComponent', () => {
  let component: ConfirmationCommentDialogComponent;
  let fixture: ComponentFixture<ConfirmationCommentDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCommentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
