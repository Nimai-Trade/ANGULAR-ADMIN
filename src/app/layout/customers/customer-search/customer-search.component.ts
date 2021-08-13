import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
//import { CustomerService } from '../customer.service';
import { BanksService } from '../../banks/banks.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { overLappingIssue } from 'src/assets/js/validation.js'

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  customerSearchForm: any;
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
  custData = 'CU';
  constructor(private formBuilder: FormBuilder, private router: Router, private service: BanksService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.customerSearchForm = formBuilder.group({
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
        // if (term !== '' && term.length>0) {   
          if(term.startsWith('B') || term.startsWith('b')){
            this.custData='BC';
          }else if(term.startsWith('C') || term.startsWith('c')){
            this.custData='CU';
          }
          console.log("term--",term)
          this.service.searchUserId(term,this.custData).subscribe(
            data => {
              this.userIdSearch = data as any[];                                      
            });
        // }
      });

    this.emailSearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchEmailId(term).subscribe(
            data => {
              this.emalSearch = data as any[];
            });
        }
      });

    this.mobileSearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchMobileNumber(term).subscribe(
            data => {
              this.mobileSearch = data as any[];
            });
        }
      });

    this.companyNameSearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchCompanyName(term).subscribe(
            data => {
              this.companyNameSearch = data as any[];
            });
        }
      });

    this.countrySearchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.service.searchCountry(term).subscribe(
            data => {
              this.countrySearch = data as any[];
            });
        }
      });
  }

  searchCustomer() {
    this.customerSearchForm.controls['userId'].setValue(this.searchTerm.value !== 'No Record Found' ? this.searchTerm.value : '');
    this.customerSearchForm.controls['emailId'].setValue(this.emailSearchTerm.value !== 'No Record Found' ? this.emailSearchTerm.value : '');
    this.customerSearchForm.controls['mobileNo'].setValue(this.mobileSearchTerm.value !== 'No Record Found' ? this.mobileSearchTerm.value : '');
    this.customerSearchForm.controls['companyName'].setValue(this.companyNameSearchTerm.value !== 'No Record Found' ? this.companyNameSearchTerm.value : '');
    this.customerSearchForm.controls['country'].setValue(this.countrySearchTerm.value !== 'No Record Found' ? this.countrySearchTerm.value : '');
    console.log("Value---",this.customerSearchForm.value);

    if (this.customerSearchForm) {
      localStorage.setItem('customerSearch', JSON.stringify(this.customerSearchForm.value));
      this.router.navigate(['app', 'customer', 'customer-list']);
    } else {

    }

  }
  removeSpaces(string) {
    return string.split(' ').join('');
   }
}
