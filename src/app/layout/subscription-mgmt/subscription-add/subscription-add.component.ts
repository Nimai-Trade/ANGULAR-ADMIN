import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { MatRadioChange } from '@angular/material';
@Component({
  selector: 'app-subscription-add',
  templateUrl: './subscription-add.component.html',
  styleUrls: ['./subscription-add.component.scss']
})
export class SubscriptionAddComponent implements OnInit {

  countryList: any;
  subscriptionForm: any;
  statusList: any;
  monthList: any;
  rmList: any;
  subscriptionData: any;
  countryData: any = [];

  constructor(private fb: FormBuilder, private service: SubscriptionService, public dialogRef: MatDialogRef<SubscriptionAddComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {

    this.subscriptionForm = fb.group({  
      modifiedBy:[],    
      createdBy:[],
      subscriptionPlanId: [],
      customerType: ['', Validators.required],
      countryName: ['', Validators.required],
      planName: ['', Validators.required],
      customerSupport: ['', Validators.required],
      remark: [],
      credits: [, Validators.required],
      subsidiaries: [, Validators.required],
      rm: ['', Validators.required],
      pricing: [, Validators.required],
      validity: ['', Validators.required],
      // status: ['', Validators.required],
      countryCurrency: ['USD']
    });
  }

  ngOnInit() {
    this.rmList = [{ 'code': 'YES', 'name': 'YES' }, { 'code': 'NO', 'name': 'NO' }];
    this.statusList = [{ 'code': 'Active', 'name': 'Active' }, { 'code': 'Inactive', 'name': 'Inactive' }];
    this.monthList = [{ 'code': '1', 'name': '1' }, { 'code': '2', 'name': '2' }, { 'code': '3', 'name': '3' }, { 'code': '4', 'name': '4' }, { 'code': '5', 'name': '5' }, { 'code': '6', 'name': '6' }, { 'code': '7', 'name': '7' }, { 'code': '8', 'name': '8' }, { 'code': '9', 'name': '9' }, { 'code': '10', 'name': '10' }, { 'code': '11', 'name': '11' }, { 'code': '12', 'name': '12' }];
    if (this.data.id) {           
      // this.subscriptionForm.controls['modifiedBy'].setValue(localStorage.getItem('nimaiId'));
      this.getSubscriptionDetailsById();
    } else {
      // this.subscriptionForm.removeControl('modifiedBy');
      this.getCountryList();
      this.subscriptionForm.controls['customerType'].setValue(this.data.customerType.value);
    }    
    if(this.data.customerType.value==='BANK AS CUSTOMER')
      this.subscriptionForm.controls['subsidiaries'].disable()
    else  
      this.subscriptionForm.controls['subsidiaries'].enable()
  }
  onChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'BANK AS CUSTOMER') {
      this.subscriptionForm.controls['subsidiaries'].disable()
    }else{
      this.subscriptionForm.controls['subsidiaries'].enable()
    }
    this.subscriptionForm.controls['customerType'].setValue(mrChange.value);
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

  onSubmitPlan() {
    if (this.data.id) {           
      this.subscriptionForm.controls['modifiedBy'].setValue(localStorage.getItem('nimaiId'));     
    } else {
      this.subscriptionForm.removeControl('modifiedBy');
    }   
    if (this.subscriptionForm.valid) {
      this.service.saveSubscriptionDetails(this.subscriptionForm.value).subscribe((res) => this.onSuccess(res));
    } else {
      this.validateAllFormFields(this.subscriptionForm);

    }
  }

  validateAllFormFields(subscriptionForm: FormGroup) {
    Object.keys(subscriptionForm.controls).forEach(field => {
      const control = subscriptionForm.get(field);

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
    return !this.subscriptionForm.get(field).valid && this.subscriptionForm.get(field).touched;
  }


  onSuccess(res) {
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }

  getSubscriptionDetailsById() {

    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;
        for (let entry of this.countryList) {
          this.countryData.push(entry.country);
        }
    this.service.getSubscriptionDetailsById(this.data.id).subscribe(
      (res) => {
        // this.subscriptionData = res;
        Object.keys(res).forEach(name => {
          if (this.subscriptionForm.controls[name]) {
            this.subscriptionForm.controls[name].patchValue(res[name]);
          }
        });
      });
    });
  }

}
