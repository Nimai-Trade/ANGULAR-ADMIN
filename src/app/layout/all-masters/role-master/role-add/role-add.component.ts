import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EmployeeAddComponent } from '../../employee-master/employee-add/employee-add.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  roleForm: any;
  statusList: any = [];
  roleData: any;
  loading = false;

  constructor(private fb: FormBuilder, private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.roleForm = fb.group({
      roleId: [],
      roleName: ['', Validators.required],
      roleShortName: ['', Validators.required],
      roleStatus: ['ACTIVE', Validators.required],
    });
  }

  ngOnInit() {
    this.statusList = [{ 'code': 'ACTIVE', 'name': 'ACTIVE' }, { 'code': 'INACTIVE', 'name': 'INACTIVE' }];
    if (this.data.id) {
      this.loadRoleDetails();
    }

  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  onSubmitRole() {
    if (this.roleForm.valid) {
      this.service.saveRoleDetails(this.roleForm.value).subscribe((res) => this.onSuccess(res));
    } else {
      this.validateAllFormFields(this.roleForm);

    }
  }

  onSuccess(res) {
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }

  validateAllFormFields(roleForm: FormGroup) {
    Object.keys(roleForm.controls).forEach(field => {
      const control = roleForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return !this.roleForm.get(field).valid && this.roleForm.get(field).touched;
  }

  loadRoleDetails() {
    this.service.getRoleDetailsById(this.data.id).subscribe(
      (res) => {
        // this.roleData = res;       
        Object.keys(res).forEach(name => {
          if (this.roleForm.controls[name]) {
            this.roleForm.controls[name].patchValue(res[name]);
          }
        });
      });
  }


  checkRoleExists(value) {
    console.log(this.roleForm.value);
    if (value && value !== this.roleForm.roleShortName) {
      this.service.checkRoleExists(value).subscribe(
        (res) => {
          if (res) {
            this.roleForm['controls'].roleShortName.setErrors({ 'isRoleExist': true });
          }
        });
    }

  }
}
