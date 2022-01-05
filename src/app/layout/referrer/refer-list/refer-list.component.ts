import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReferrerService } from '../referrer.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { BankTrxnDetailsComponent } from '../../banks/bank-trxn-details/bank-trxn-details.component';
import { BankQuoteDetailComponent } from '../../banks/bank-quote-detail/bank-quote-detail.component';
import { ReferDetailsComponent } from '../refer-details/refer-details.component';

@Component({
  selector: 'app-refer-list',
  templateUrl: './refer-list.component.html',
  styleUrls: ['./refer-list.component.scss']
})
export class ReferListComponent implements OnInit {

  searchData: any;
  referForm: any;

  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position', 'mobileNo', 'emailAddress','companyName', 'countryName',  'firstName', 'lastName', 'status', 'actions'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  referList: any = [];

  eventStartTime = new Date();
  constructor(private formBuilder: FormBuilder, private router: Router, private service: ReferrerService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.referForm = formBuilder.group({
      txtStatus: [],
      userId: [],
      type: [],
      status:[]
    });
  }

  ngOnInit() {
    console.log("test")
    this.referForm.controls['userId'].patchValue(localStorage.getItem('referrerUserId'));
    this.referForm.controls['type'].patchValue(localStorage.getItem('referrerType'));
    this.setPagerConfig();
  }

  ngAfterViewInit() {
    this.loadReferList();
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
    this.loadReferList();
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
    this.loadReferList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadReferList();
  }

  loadReferList() {
    this.service.getReferList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.referForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.referList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        //console.log(item);
        if(item !== null){
        this.referList.push(item);
        }
      });
      this.dataSource = new MatTableDataSource(this.referList);
    }
  }

  onChangeType(transactionType) {
    //console.log('transaction status ' + transactionType);
    this.loadReferList();
  }

  onPreview(id) {
    //console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(ReferDetailsComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Reference Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

 
  
}
