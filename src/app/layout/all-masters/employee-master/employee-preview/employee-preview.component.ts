import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { AllMasterService } from '../../all-masters.service';

@Component({
  selector: 'app-employee-preview',
  templateUrl: './employee-preview.component.html',
  styleUrls: ['./employee-preview.component.scss']
})
export class EmployeePreviewComponent implements OnInit {

  employeeData: any;
  roleInfo: any = [];
  roleSelection: any = [];

  constructor(private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadEmployeeDetail();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadEmployeeDetail() {
    this.service.getEmployeeDetailsById(this.data.id).subscribe(
      (res) => {
        this.employeeData = res;       
        this.roleInfo = res['roleInfo'];
        for (let record of this.roleInfo) {
          this.roleSelection.push(record.roleName);
        }

      });
  }

}
