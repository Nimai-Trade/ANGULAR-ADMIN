import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { TransactionService } from '../transactions.service';
import { Router } from '@angular/router';
import { AppDateAdapter } from 'src/app/shared/directive/format-datepicker';
import { APP_DATE_FORMATS } from '../secondary-transaction-list/secondary-transaction-list.component';
import { overLappingIssue } from 'src/assets/js/validation.js'
@Component({
  selector: 'app-secondary-transaction-search',
  templateUrl: './secondary-transaction-search.component.html',
  styleUrls: ['./secondary-transaction-search.component.scss'],
   providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class SecondaryTransactionSearchComponent implements OnInit {

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
  dateRangeValue: FormControl = new FormControl();
  myDate: any;
  start: any; 
  end: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private service: TransactionService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.transactionSearchForm = formBuilder.group({
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: [],
      startDate: [],
      endDate: [],
      goodsType: []
    });
  }

  ngOnInit() {
    overLappingIssue();
    localStorage.removeItem('transactonSearch');
    localStorage.removeItem('transactionId');
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          // console.log('In search User ID ' + term);
          this.service.searchUserId(term).subscribe(
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


  searchTrasaction() {
    // console.log('start date '+this.start +' End date '+this.end);
    // console.log(this.dateRangeValue.value);
    // console.log(this.transactionSearchForm.controls['startDate']);
    this.transactionSearchForm.controls['userId'].setValue(this.searchTerm.value !== 'No Record Found' ? this.searchTerm.value : '');
    this.transactionSearchForm.controls['emailId'].setValue(this.emailSearchTerm.value !== 'No Record Found' ? this.emailSearchTerm.value : '');
    this.transactionSearchForm.controls['mobileNo'].setValue(this.mobileSearchTerm.value !== 'No Record Found' ? this.mobileSearchTerm.value : '');
    this.transactionSearchForm.controls['companyName'].setValue(this.companyNameSearchTerm.value !== 'No Record Found' ? this.companyNameSearchTerm.value : '');
    this.transactionSearchForm.controls['country'].setValue(this.countrySearchTerm.value !== 'No Record Found' ? this.countrySearchTerm.value : '');
    console.log(this.transactionSearchForm.value);

    if (this.transactionSearchForm) {
      localStorage.setItem('transactonSearch', JSON.stringify(this.transactionSearchForm.value));
      // localStorage.setItem('transactonSearch', this.transactionSearchForm.value);
      this.router.navigate(['app', 'secondary-transaction', 'secondary-transactions-list']);
    } else {

    }

  }



}
