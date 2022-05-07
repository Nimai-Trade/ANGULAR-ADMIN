import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SecondaryQuotesDetailsComponent } from '../secondary-quotes-details/secondary-quotes-details.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../transactions.service';
import { SharedUtilService } from 'src/app/shared/services/shared-util';

@Component({
  selector: 'app-secondary-transaction-quotes',
  templateUrl: './secondary-transaction-quotes.component.html',
  styleUrls: ['./secondary-transaction-quotes.component.scss']
})
export class SecondaryTransactionQuotesComponent implements OnInit {

  quotationForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position','transactionId', 'bankUserid', 'totalQuoteValue', 'currency', 'quotationStatus' ,'validityDate'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  quotationList: any = [];

  eventStartTime = new Date();

  constructor(private formBuilder: FormBuilder, private router: Router, private service: TransactionService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.quotationForm = formBuilder.group({
      transactionId: []
    });
  }

  ngOnInit() {
    this.quotationForm.controls['transactionId'].patchValue(localStorage.getItem('transactionId'));
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadQuotationList();
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
    this.loadQuotationList();
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
    this.loadQuotationList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadQuotationList();
  }

  loadQuotationList() {
    this.service.getQuotationList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.quotationForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.quotationList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.quotationList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.quotationList);
    }
  }

  onChangeType(transactionType) {
    console.log('transactionType ' + transactionType);
    this.loadQuotationList();
  }

  onPreview(id) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(SecondaryQuotesDetailsComponent, {
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