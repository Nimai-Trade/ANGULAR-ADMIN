import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EmployeeAddComponent } from '../../employee-master/employee-add/employee-add.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';


@Component({
  selector: 'app-rights-add',
  templateUrl: './rights-add.component.html',
  styleUrls: ['./rights-add.component.scss']
})
export class RightsAddComponent implements OnInit {
  rightForm: any;
  statusList: any = [];
  rightData: any;
  loading = false;
  
  constructor(private fb: FormBuilder, private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.rightForm = fb.group({
      rightId: [],
      rightName: ['', Validators.required],
      rightShortName: ['', Validators.required],

      rightStatus: ['ACTIVE', Validators.required]

    });
  }

  ngOnInit() {
    this.statusList = [{ 'code': 'ACTIVE', 'name': 'ACTIVE' }, { 'code': 'INACTIVE', 'name': 'INACTIVE' }];
    if (this.data.id) {
      this.loadRightDetails();
    }

  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  onSubmitRight() {
    if (this.rightForm.valid) {
      this.service.saveRightDetails(this.rightForm.value).subscribe((res) => this.onSuccess(res));
    } else {
      this.validateAllFormFields(this.rightForm);

    }
  }

  onSuccess(res) {
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }

  validateAllFormFields(rightForm: FormGroup) {
    Object.keys(rightForm.controls).forEach(field => {
      const control = rightForm.get(field);
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
    return !this.rightForm.get(field).valid && this.rightForm.get(field).touched;
  }

  loadRightDetails() {
    this.service.getRightDetailsById(this.data.id).subscribe(
      (res) => {
        Object.keys(res).forEach(name => {
          if (this.rightForm.controls[name]) {
            this.rightForm.controls[name].patchValue(res[name]);
          }
        });
      });
  }

  checkRightExists(value) {
    console.log(this.rightForm.value);
    if (value && value !== this.rightForm.rightShortName) {
      this.service.checkRightExists(value).subscribe(
        (res) => {
          if (res) {
            this.rightForm['controls'].rightShortName.setErrors({ 'isRightExist': true });
          }
        });
    }

  }
}
