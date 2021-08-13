import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { BankKycComponent } from '../bank-kyc/bank-kyc.component';
import { BankPlanPaymentComponent } from '../bank-plan-payment/bank-plan-payment.component';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-bank-listing',
  templateUrl: './bank-listing.component.html',
  styleUrls: ['./bank-listing.component.scss']
})
export class BankListingComponent implements OnInit {

  searchData: any;
  bankListForm: any;
  kycStatusList: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position','userid', 'firstName', 'lastName', 'landline', 'emailAddress', 'registeredCountry', 'bankName', 'modeOfPayment', 'totalTxn', 'kycStatus', 'actions'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  bankList: any = [];

  eventStartTime = new Date();
  constructor(private formBuilder: FormBuilder, private router: Router, private service: BanksService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.bankListForm = formBuilder.group({
      txtStatus: [],
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: [],
      role: []
    });
  }

  ngOnInit() {
    const savedData = JSON.parse(localStorage.getItem('bankSearch'));
    Object.keys(savedData).forEach(name => {
      if (this.bankListForm.controls[name]) {
        this.bankListForm.controls[name].patchValue(savedData[name]);
      }
    });
    this.bankListForm.controls['role'].patchValue(localStorage.getItem('role'));
    this.kycStatusList = [{ 'code': 'ALL', 'name': 'ALL' }, { 'code': 'Pending', 'name': 'Pending' }, { 'code': 'Approved', 'name': 'Approved' }, { 'code': 'Rejected', 'name': 'Rejected' }, { 'code': 'null', 'name': 'Not Uploaded' }];
    this.setPagerConfig();
  }

  ngAfterViewInit() {
    this.loadBankList();
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
    this.loadBankList();
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
    this.loadBankList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadBankList();
  }

  loadBankList() {
    this.service.getTransactionList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.bankListForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.bankList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        this.bankList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.bankList);
    }
  }

  onChangeType(transactionType) {
    this.loadBankList();
  }

  onPreview(id) {
    const dialogRef = this.dialog.open(BankDetailsComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Bank Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadTransactionList();
    });
  }

  showPayment(id) {
    const dialogRef = this.dialog.open(BankPlanPaymentComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Plan and Payments', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadTransactionList();
    });
  }
  showKyc(id) {
    const dialogRef = this.dialog.open(BankKycComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'KYC Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadBankList();
    });
  }

  getQuotes(userId){
    if (userId !== undefined) {
      localStorage.setItem('quoteUserId', userId);
      // localStorage.setItem('transactonSearch', this.transactionSearchForm.value);
      this.router.navigate(['app', 'bank', 'quote-list']);
    } else {

    }
    
  }

}

