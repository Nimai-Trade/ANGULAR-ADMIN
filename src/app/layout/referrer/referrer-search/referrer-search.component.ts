import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../customers/customer.service';
import { MatDialog } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ReferrerService } from '../referrer.service';
import { overLappingIssue } from 'src/assets/js/validation.js'

@Component({
  selector: 'app-referrer-search',
  templateUrl: './referrer-search.component.html',
  styleUrls: ['./referrer-search.component.scss']
})
export class ReferrerSearchComponent implements OnInit {

  referrerSearchForm: any;
  userIdSearch = <any>[];
  searchTerm: FormControl = new FormControl();
  emalSearch = <any>[];
  emailSearchTerm: FormControl = new FormControl();
  mobileSearch = <any>[];
  mobileSearchTerm: FormControl = new FormControl();
  companyNameSearch = <any>[];
  companyNameSearchTerm: FormControl = new FormControl();
  countrySearch = <any>[];
  countrySearchTerm: FormControl = new FormControl();
  referData = 'RE';

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ReferrerService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.referrerSearchForm = formBuilder.group({
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: [],
    });
  }

  ngOnInit() {
    overLappingIssue();
    localStorage.removeItem('referrerSearch');
    localStorage.removeItem('transactionId');
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          // console.log('In search User ID ' + term);
          this.service.searchUserId(term, this.referData).subscribe(
            data => {
              this.userIdSearch = data as any[];
              console.log(data[0]);
            });
        }
      });

    this.emailSearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchEmailId(term).subscribe(
            data => {
              this.emalSearch = data as any[];
              console.log(data[0]);
            });
        }
      });

    this.mobileSearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchMobileNumber(term).subscribe(
            data => {
              this.mobileSearch = data as any[];
              console.log(data[0]);
            });
        }
      });

    this.companyNameSearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchCompanyName(term).subscribe(
            data => {
              this.companyNameSearch = data as any[];
              console.log(data[0]);
            });
        }
      });

    this.countrySearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchCountry(term).subscribe(
            data => {
              this.countrySearch = data as any[];
              console.log(data[0]);
            });
        }
      });
  }

  searchCustomer() {
    this.referrerSearchForm.controls['userId'].setValue(this.searchTerm.value !== 'No Record Found' ? this.searchTerm.value : '');
    this.referrerSearchForm.controls['emailId'].setValue(this.emailSearchTerm.value !== 'No Record Found' ? this.emailSearchTerm.value : '');
    this.referrerSearchForm.controls['mobileNo'].setValue(this.mobileSearchTerm.value !== 'No Record Found' ? this.mobileSearchTerm.value : '');
    this.referrerSearchForm.controls['companyName'].setValue(this.companyNameSearchTerm.value !== 'No Record Found' ? this.companyNameSearchTerm.value : '');
    this.referrerSearchForm.controls['country'].setValue(this.countrySearchTerm.value !== 'No Record Found' ? this.countrySearchTerm.value : '');
    console.log(this.referrerSearchForm.value);

    if (this.referrerSearchForm) {
      localStorage.setItem('referrerSearch', JSON.stringify(this.referrerSearchForm.value));
      this.router.navigate(['app', 'referrer', 'referrer-list']);
    } else {

    }

  }

}
