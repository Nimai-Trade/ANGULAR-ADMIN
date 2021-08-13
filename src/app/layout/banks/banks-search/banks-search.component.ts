import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BanksService } from '../banks.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { overLappingIssue } from 'src/assets/js/validation.js'

@Component({
  selector: 'app-banks-search',
  templateUrl: './banks-search.component.html',
  styleUrls: ['./banks-search.component.scss']
})
export class BanksSearchComponent implements OnInit {

  transactionSearchForm: any;
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
  bankData = 'BA';

  constructor(private formBuilder: FormBuilder, private router: Router, private service: BanksService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.transactionSearchForm = formBuilder.group({
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: []
    });
  }

  
  ngOnInit() {
    overLappingIssue();
    localStorage.removeItem('customerSearch');
    localStorage.removeItem('transactionId');
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          // console.log('In search User ID ' + term);
          this.service.searchUserId(term, this.bankData).subscribe(
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
          this.service.searchBankName(term, this.bankData).subscribe(
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

  searchBank() {
    this.transactionSearchForm.controls['userId'].setValue(this.searchTerm.value !== 'No Record Found' ? this.searchTerm.value : '');
    this.transactionSearchForm.controls['emailId'].setValue(this.emailSearchTerm.value !== 'No Record Found' ? this.emailSearchTerm.value : '');
    this.transactionSearchForm.controls['mobileNo'].setValue(this.mobileSearchTerm.value !== 'No Record Found' ? this.mobileSearchTerm.value : '');
    this.transactionSearchForm.controls['companyName'].setValue(this.companyNameSearchTerm.value !== 'No Record Found' ? this.companyNameSearchTerm.value : '');
    this.transactionSearchForm.controls['country'].setValue(this.countrySearchTerm.value !== 'No Record Found' ? this.countrySearchTerm.value : '');
    console.log(this.transactionSearchForm.value);

    if (this.transactionSearchForm) {
      localStorage.setItem('bankSearch', JSON.stringify(this.transactionSearchForm.value));
      this.router.navigate(['app', 'bank', 'bank-list']);
    } else {

    }

  }

}
