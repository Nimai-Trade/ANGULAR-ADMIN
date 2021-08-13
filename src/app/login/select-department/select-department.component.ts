import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.scss']
})
export class SelectDepartmentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectDepartmentComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  selectedRole = new FormControl();

  ngOnInit() {
  }

  closeDialog() {
    return this.dialogRef.close({ result: true, data: "hi" });
  }

  onSubmitDept(role) {
    return this.dialogRef.close({ role: role });
  }

}
