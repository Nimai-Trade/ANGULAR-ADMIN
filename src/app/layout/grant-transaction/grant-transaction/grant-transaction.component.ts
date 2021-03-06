import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GrantTransactionService } from '../grant-transaction.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MAT_DATE_FORMATS } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { SelectionModel } from '@angular/cdk/collections';
// import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { Router } from '@angular/router';
import { ConfirmDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';
@Component({
  selector: 'app-grant-transaction',
  templateUrl: './grant-transaction.component.html',
  styleUrls: ['./grant-transaction.component.scss']
})
export class GrantTransactionComponent implements OnInit {

  searchData: any;
  transactionListForm: any;
  transactionTypeList: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position','userId', 'mobileNo', 'emailId', 'beneficiry', 'beneficiryCountry', 'applicant', 'applicantCountry', 'transactionId', 'insertedDate', 'validity', 'lcBank', 'amount', 'lcValue', 'requirementType', 'transactionStatus', 'actions'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  transactionList: any = [];
  index : number = 0;

  eventStartTime = new Date();
  dateValue: any[];
  countryList: any;
  countryData: any = [];
  user: any;
  message: string;
  result: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: GrantTransactionService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.transactionListForm = formBuilder.group({
      txtStatus: [],
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: [],
      goodsType: [],
      startDate: [],
      dateFrom: [],
      dateTo: []
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('nimaiId');
    console.log('this-----')
    // get and parse the saved data from localStorage
    // this.userId = JSON.parse(localStorage.getItem('transactonSearch'));

    // commmented by johra
    // const savedData = JSON.parse(localStorage.getItem('transactonSearch'));
    // Object.keys(savedData).forEach(name => {
    //   if (this.transactionListForm.controls[name]) {
    //     this.transactionListForm.controls[name].patchValue(savedData[name]);
    //   }
    // });
    if (this.transactionListForm.controls['startDate'].value !== null && this.transactionListForm.controls['startDate'].value !== undefined) {
      this.dateValue = this.transactionListForm.controls['startDate'].value;
     // console.log(this.dateValue[0].substr(0, 10));
      //console.log(this.dateValue[1].substr(0, 10));
      this.transactionListForm.controls['dateFrom'].patchValue(this.dateValue[0].substr(0, 10));
      this.transactionListForm.controls['dateTo'].patchValue(this.dateValue[1].substr(0, 10));
    }
   // console.log(this.transactionListForm);
    this.transactionTypeList = [{ 'code': 'ALL', 'name': 'ALL' }, { 'code': 'Active', 'name': 'Active' },{ 'code': 'Pending', 'name': 'Pending' }, { 'code': 'Accepted', 'name': 'Accepted' }, { 'code': 'Rejected', 'name': 'Rejected' }, { 'code': 'Expired', 'name': 'Expired' }];
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadTransactionList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'insertedDate',
      direction: direction || 'desc',
      totalItems: totalItems || 0
    };
    console.log(this.pagerConfig)
  }
   getCountryList() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;
        this.countryData.push('All');
        for (let entry of this.countryList) {
          this.countryData.push(entry.country);
        }
      });
  }

  onChangeTypeCountry(country) {
    // console.log(this.countryVal);
  //  this.transactionListForm.get('country').setValue(this.countryVal);
   
     // this.loadPaymentList();
    
  }

  loadPaymentList() {
    // console.log(this.paymentApprovalForm.controls['country'].value)
    // this.service.getWireTransferList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.paymentApprovalForm.value).subscribe((res) => this.onSuccess(res));
   }
  selectAll(selectedCheckboxes) {
    this.selectedCheckboxes = selectedCheckboxes;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(checked: boolean) {
    this.selectedCheckboxes = [];
    if (checked) {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.selectedCheckboxes.push(row);
      });
    } else {
      this.dataSource.data.forEach(row => {
        this.selection.clear();
        this.selectedCheckboxes.splice(this.selectedCheckboxes.indexOf(row), 1);
      });
    }
    this.selectAll(this.selectedCheckboxes);
  }

  onSortChange(event) {
    this.masterToggle(false);
    this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, event.active, event.direction);
    this.loadTransactionList();
  }

  onPageChange(event?) {
    this.masterToggle(false);
    if (event === undefined) {
    } else {
      this.pagerConfig.sortBy = event.sortBy;
      this.pagerConfig.direction = event.direction;
      this.pagerConfig.pageIndex = event.pageIndex;
      this.pagerConfig.pageSize = event.pageSize;
    }
    this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadTransactionList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadTransactionList();
  }

  loadTransactionList() {
    this.service.getTransactionList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.transactionListForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.transactionList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
      //  console.log(item);
        this.transactionList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.transactionList);
    }
  }


  
  confirmDialog(status, ele) {
    console.log(ele)
    // console.log('status ' + status + ' id ' + item.controls['kycid'].value);
    // console.log(item.controls['reason'].value);
    if(status=='Approved'){
      var stat='Approve';
      this.message = 'Are you sure you want to ' + stat + ' the transaction?';
    }else if(status=='Rejected'){
      var stat='Reject';
      this.message = 'Are you sure you want to ' + stat + ' the transaction?';
    }
    const dialogData = new ConfirmDialogModel('Confirm Action', this.message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '50%',
      height: '45%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        const reqData = {
          // 'kycid': kycid,
          // 'kycStatus': status,
          // 'approverName': localStorage.getItem('nimaiId'),
          // 'approvalReason': this.result['data'],
          // 'comment': this.result['data'],

          'countryName':null,
          'transactionId':ele.transactionId,
          'status':status,
          'userId':ele.userId,
          'makerComment':null,
          'checkerComment':this.result['data'],
          'customerType':null

        };
        console.log(reqData)
        this.service.CheckerGrantTrnxStatusUpdate(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadTransactionList();
          }, (error) => {
            this.sharedUtilService.showSnackBarMessage(error.error.message);
        });
      }
    });

  }

  onChangeType(transactionType) {
    //console.log('transactionType ' + transactionType);
    this.loadTransactionList();
  }

  // onPreview(id) {
  // // console.log('>>>> ' + id);
  //   const dialogRef = this.dialog.open(TransactionDetailsComponent, {
  //     width: '50%',
  //     height: '100%',
  //     data: { title: 'Transaction Details', id: id },
  //     disableClose: true
  //   }).updatePosition({ right: '0px', bottom: '0px' });
  //   dialogRef.afterClosed().subscribe(result => {
  //     // this.loadTransactionList();
  //   });
  // }

  getQuotes(id) {
    //console.log(' getQuotes >>>> ' + id);
    if (id !== undefined) {
      localStorage.setItem('transactionId', id);
      // localStorage.setItem('transactonSearch', this.transactionSearchForm.value);
      this.router.navigate(['app', 'transactions', 'transactions-quotes']);
    } else {

    }
  }

}
