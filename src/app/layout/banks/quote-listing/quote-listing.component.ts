import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BanksService } from '../banks.service';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { QuotesDetailsComponent } from '../../transactions/quotes-details/quotes-details.component';
import { BankQuoteDetailComponent } from '../bank-quote-detail/bank-quote-detail.component';
import { BankTrxnDetailsComponent } from '../bank-trxn-details/bank-trxn-details.component';

@Component({
  selector: 'app-quote-listing',
  templateUrl: './quote-listing.component.html',
  styleUrls: ['./quote-listing.component.scss']
})
export class QuoteListingComponent implements OnInit {

  searchData: any;
  quotationForm: any;

  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position','bankUserid', 'mobileNumber', 'emailAddress', 'beneficiry', 'beneficiryCountry',  'transactionId', 'insertedDate', 'validityDate', 'lcBank', 'amount', 'ccy', 'totalQuoteValue', 'currency', 'requiredment', 'quotationStatus',  'actions'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  quoteList: any = [];

  eventStartTime = new Date();
  constructor(private formBuilder: FormBuilder, private router: Router, private service: BanksService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.quotationForm = formBuilder.group({
      txtStatus: [],
      userId: []
    });
  }

  ngOnInit() {
    this.quotationForm.controls['userId'].patchValue(localStorage.getItem('quoteUserId'));
    this.setPagerConfig();
  }

  ngAfterViewInit() {
    this.loadQuoteList();
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
    this.loadQuoteList();
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
    this.loadQuoteList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadQuoteList();
  }

  loadQuoteList() {
    this.service.getQuoteList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.quotationForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.quoteList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.quoteList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.quoteList);
    }
  }

  onChangeType(transactionType) {
    console.log('transaction status ' + transactionType);
    this.loadQuoteList();
  }

  onPreview(id) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(BankTrxnDetailsComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Transaction Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadTransactionList();
    });
  }

  getQuotes(id) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(BankQuoteDetailComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Bank Quote', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadTransactionList();
    });
  }
  
}
