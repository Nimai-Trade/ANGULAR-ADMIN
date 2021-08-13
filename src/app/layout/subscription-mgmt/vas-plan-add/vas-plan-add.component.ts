import { Component, OnInit, Inject } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { MatRadioChange } from '@angular/material';
@Component({
  selector: 'app-vas-plan-add',
  templateUrl: './vas-plan-add.component.html',
  styleUrls: ['./vas-plan-add.component.scss']
})
export class VasPlanAddComponent implements OnInit {

  countryList: any;
  vasForm: any;
  countryData: any = [];
  constructor(private fb: FormBuilder, private service: SubscriptionService, public dialogRef: MatDialogRef<VasPlanAddComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {

    this.vasForm = fb.group({
      customerType: ['', Validators.required],
      vasid: [],
      planName: ['', Validators.required],
      description1: ['', Validators.required],
      description2: ['', Validators.required],
      description3: [],
      description4: [],
      description5: [],
      pricing: [, Validators.required],
      countryName: [, Validators.required],
      countryCurrency: ['USD']
    });
  }

  ngOnInit() {
    this.getCountryList();
    if (this.data.id) {
      this.getVasDetailsById();
    }
  }
  onChange(mrChange: MatRadioChange) {
    //console.log(mrChange.value);
    // if (mrChange.value === 'BANK AS CUSTOMER') {
    //   this.vasForm.controls['subsidiaries'].disable()
    // }else{
    //   this.vasForm.controls['subsidiaries'].enable()
    // }
    this.vasForm.controls['customerType'].setValue(mrChange.value);
 } 
  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  getCountryList() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;
        for (let entry of this.countryList) {
          this.countryData.push(entry.country);
        }
      });
  }

  onSelectCountry(country) {
    this.vasForm.controls['countryCurrency'].setValue(country.currency);
  }

  onSubmitPlan() {
    if (this.vasForm.valid) {
      this.service.saveVasDetails(this.vasForm.value).subscribe((res) => this.onSuccess(res));
    } else {
      this.validateAllFormFields(this.vasForm);

    }
  }


  validateAllFormFields(vasForm: FormGroup) {
    Object.keys(vasForm.controls).forEach(field => {
      const control = vasForm.get(field);
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
    return !this.vasForm.get(field).valid && this.vasForm.get(field).touched;
  }


  onSuccess(res) {
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }

  getVasDetailsById() {
    this.service.getVasDetailsById(this.data.id).subscribe(
      (res) => {
        // this.roleData = res;       
        Object.keys(res).forEach(name => {
          if (this.vasForm.controls[name]) {
            this.vasForm.controls[name].patchValue(res[name]);
          }
        });
      });
  }


}
