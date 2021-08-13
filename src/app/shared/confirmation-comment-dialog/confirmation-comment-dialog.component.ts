import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedUtilService } from '../services/shared-util';

@Component({
  selector: 'app-confirmation-comment-dialog',
  templateUrl: './confirmation-comment-dialog.component.html',
  styleUrls: ['./confirmation-comment-dialog.component.scss']
})
export class ConfirmationCommentDialogComponent implements OnInit {

  title: string;
  message: string;
  confirmationForm: FormGroup;
  comment : any;

  constructor(public dialogRef: MatDialogRef<ConfirmationCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel, private fb: FormBuilder, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.title = data.title;
    this.message = data.message;
    this.comment = '';
  }


  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  OnSubmit() {
    console.log('Comment '+this.comment);
    return this.dialogRef.close({ result: true, data : this.comment });
  }

//   public noWhitespaceValidator(control: FormControl) {
//     const isWhitespace = (control.value || '').trim().length === 0;
//     const isValid = !isWhitespace;
//     return isValid ? null : { 'whitespace': true };
// }
}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
