import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EmployeeAddComponent } from '../../employee-master/employee-add/employee-add.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';

@Component({
  selector: 'app-mapping-add',
  templateUrl: './mapping-add.component.html',
  styleUrls: ['./mapping-add.component.scss']
})
export class MappingAddComponent implements OnInit {

  mappingForm: any;
  mappingData: any;
  roleInfo: any = [];
  rightsInfo: any = [];
  selectedRights: any = [];
  selectedOptions: string[] = [];
  objectData: any;

  constructor(private fb: FormBuilder, private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.mappingForm = fb.group({
      role: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.loadRoleDetails();
    this.loadRightsDetails();

  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadRoleDetails() {
    this.service.getRoleDataList().subscribe(
      (res) => {
        this.roleInfo = res;
      });
  }

  loadRightsDetails() {
    this.service.getRightsDataList().subscribe(
      (res) => {
        this.rightsInfo = res;
      });
  }

  onChangeRole(roleId) {
    console.log('roleId ' + roleId);
    if (roleId !== "" && roleId !== undefined) {
      this.service.getRightsDetailById(roleId).subscribe(
        (res) => {
          this.selectedRights = res;
          this.selectedOptions = this.selectedRights;
          console.log(this.selectedOptions);
        });
    } else {
      this.selectedRights = [];
      this.selectedOptions = [];
    }

  }

  onSubmitData() {
    const reqData = {
      'rightsId': this.selectedOptions,
      'roleId': this.mappingForm.controls['role'].value
    };
    this.service.submitRightsMapping(reqData).subscribe(
      (res) => this.onSuccess(res)
      );
  }

  onSuccess(res) {
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }



}
