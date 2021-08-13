import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter } from 'src/app/shared/directive/format-datepicker';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
// import { APP_DATE_FORMATS } from '../transactions/transactions-list/transactions-list.component';
import { overLappingIssue } from 'src/assets/js/validation.js'
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DatePipe } from '@angular/common';

// import { APP_DATE_FORMATS } from '../report/report.component';

export const APP_DATE_FORMATS = {
  parse: { dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' } },
  display: {
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearLabel: { year: 'numeric' }
  }
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class ReportComponent implements OnInit {
  reportNames: string[] = ['Customer Trxn Report', 'Bank Transaction Report',
    'Payment & Subscription Report',
    'Trxn Expiry Report', 'New User Status Report', 'User Subscription Renewal',
    'Discount Coupon Report', 'Product Requirement Report', 'Referrer Report', 'Customer RM Performance Report',
    'Bank RM Performance Report(cust)', 'Bank RM Performance Report(uw)', 'Country wise Report'
  ];
  // report: FormControl = new FormControl();
  reportSearchForm: FormGroup = new FormGroup({});
  // userid = new FormControl();
  // startDate: FormControl = new FormControl();
  requirementType: any;
  myDate: any[];
  start: any;
  end: any;
  dateValue: any;
  startDate:any;
  endDate:any;
  isDisabled: boolean;
  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder, private router: Router, private service: ReportService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.reportSearchForm = formBuilder.group({
      userId: [],
      report: ['', Validators.required],
      startDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    overLappingIssue();
  }

  dwnldExcel(): void {
    if (this.reportSearchForm.valid) {
      this.dateValue = this.reportSearchForm.controls['startDate'].value;
      this.startDate = this.datePipe.transform(this.dateValue[0], 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(this.dateValue[1], 'yyyy-MM-dd');
      console.log(this.dateValue[0]);
      console.log(this.dateValue[1]);
      this.service.getReportUidExcel(this.reportSearchForm.controls['report'].value, this.reportSearchForm.controls['userId'].value, this.startDate, this.endDate).subscribe(
        (res) => {
          if(res)
          this.sharedUtilService.showSnackBarMessage(res);
         });
    } else {
      this.validateAllFormFields(this.reportSearchForm);

    }
  }
  onSelect() {
    console.log(this.reportSearchForm.get('report').value);
    let rep = this.reportSearchForm.get('report').value;
    if (rep === "Country wise Report" || rep === "Product Requirement Report") {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  validateAllFormFields(reportSearchForm: FormGroup) {
    Object.keys(reportSearchForm.controls).forEach(field => {
      const control = reportSearchForm.get(field);
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
    return !this.reportSearchForm.get(field).valid && this.reportSearchForm.get(field).touched;
  }


}
