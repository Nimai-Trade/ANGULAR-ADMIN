import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ReferrerService } from '../referrer.service';
import { ReferrerKycComponent } from '../referrer-kyc/referrer-kyc.component';

@Component({
  selector: 'app-referrer-list',
  templateUrl: './referrer-list.component.html',
  styleUrls: ['./referrer-list.component.scss']
})
export class ReferrerListComponent implements OnInit {

  searchData: any;
  customerListForm: any;
  kycStatusList: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position','userid', 'mobileNumber', 'emailAddress','companyName', 'countryName',  'firstName', 'lastName', 'kycStatus', 'totalReference', 'approvedReference', 'rejectedReference', 'pendingReference', 'earning', 'ccy'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  transactionList: any = [];

  eventStartTime = new Date();
  status: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ReferrerService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.customerListForm = formBuilder.group({
      txtStatus: [],
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: []
    });
  }

  ngOnInit() {
    // get and parse the saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('referrerSearch'));
    Object.keys(savedData).forEach(name => {
      if (this.customerListForm.controls[name]) {
        this.customerListForm.controls[name].patchValue(savedData[name]);
      }
    });

    if(localStorage.getItem('fromDashBoard')){      
     if(localStorage.getItem('PaymentApproval')=='Not Uploaded'){
        this.customerListForm.get('txtStatus').setValue("Not Uploaded");   
       // this.status= localStorage.getItem('fromDashBoardStatus')  ; 
      }
      else{
      this.customerListForm.get('txtStatus').setValue("Pending");   
      this.status= localStorage.getItem('fromDashBoardStatus')  ;
      }  
    }
    localStorage.removeItem('fromDashBoardStatus')
    localStorage.removeItem('fromDashBoard') 
    localStorage.removeItem('PaymentApproval')


    //console.log(this.customerListForm);
    this.kycStatusList = [{ 'code': 'ALL', 'name': 'ALL' }, { 'code': 'Active', 'name': 'Active' }, { 'code': 'Accepted', 'name': 'Accepted' }, { 'code': 'Rejected', 'name': 'Rejected' }, { 'code': 'Expired', 'name': 'Expired' }];
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadReferrerList();
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
    this.loadReferrerList();
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
    this.loadReferrerList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadReferrerList();
  }

  loadReferrerList() {
    this.service.getReferrerList(localStorage.getItem('role'), this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.customerListForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.transactionList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        //console.log(item);
        this.transactionList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.transactionList);
    }
  }

  onChangeType(transactionType) {
   // console.log('transactionType ' + transactionType);
    this.loadReferrerList();
  }

  getRefer(userId, type){
    //console.log(' getRefer >>>> ' + userId);
    if (userId !== undefined) {
      localStorage.setItem('referrerUserId', userId);
      localStorage.setItem('referrerType', type);
      this.router.navigate(['app', 'referrer', 'refer-list']);
    } else {

    }
    
  }

  showKyc(id) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(ReferrerKycComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'KYC Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadReferrerList();
    });
  }


}