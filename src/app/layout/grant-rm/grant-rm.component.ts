import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { GrantRmService } from './grant-rm.service';

@Component({
  selector: 'app-grant-rm',
  templateUrl: './grant-rm.component.html',
  styleUrls: ['./grant-rm.component.scss']
})
export class GrantRmComponent implements OnInit {

  assignRmForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  // roleListForm: any;
  activeList = ['Yes', 'No'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  customerList: any = [];
  rmList: any;
  bankRmList: any;
  customerRmList: any;
  userTypeList: any;
  displayColumns: string[] = ['position','userid', 'insertedDate', 'subscriberType', 'companyName', 'countryName', 'firstName', 'lastName','rmId', 'rmName', 'actions'];
  result = '';
  user : any;

  constructor(private formBuilder: FormBuilder, private service: GrantRmService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.assignRmForm = formBuilder.group({
      userType: [],
      status:'Pending'
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('nimaiId');
    this.setPagerConfig();
    this.userTypeList = [{ 'code': '', 'name': 'ALL' }, { 'code': 'CU', 'name': 'CUSTOMER' }, { 'code': 'BA', 'name': 'BANK' }, { 'code': 'RE', 'name': 'REFERRER' }, { 'code': 'BC', 'name': 'BANK AS CUSTOMER' }];

    
    if(localStorage.getItem('fromDashBoard')){      
      if( localStorage.getItem('fromDashBoardStatus')=='CU')
         this.assignRmForm.get('userType').setValue("CU");     
      if( localStorage.getItem('fromDashBoardStatus')=='BA')
         this.assignRmForm.get('userType').setValue("BA"); 
      if( localStorage.getItem('fromDashBoardStatus')=='BC')
         this.assignRmForm.get('userType').setValue("BC"); 
      if( localStorage.getItem('fromDashBoardStatus')=='RE')
         this.assignRmForm.get('userType').setValue("RE"); 
    }

  }


  ngAfterViewInit() {
    this.loadAssignRmList();
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
    this.loadAssignRmList();
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
    this.loadAssignRmList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadAssignRmList();
  }

  loadAssignRmList() {
    this.service.getAssignRmList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.assignRmForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.customerList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.customerList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.customerList);
    }
  }


  confirmDialog(userId, rm, action): void {
    const message = 'Are you sure you want to ' + action + '?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '45%',
      height: '30%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        if(action === 'Approve'){
        const reqData = {
          'userId': userId,
          'rm': rm,
          'status':'Active'
        };
        this.service.updateRM(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadAssignRmList();
          });
      } else {
        const reqData = {
          'userId': userId,
          'rm': null,
          'status':null
        };
        this.service.updateRM(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadAssignRmList();
          });
      }
    }
    });
  }

  getRmList() {
    this.service.getRmList().subscribe(
      (res) => {
        console.log(res);
        this.rmList = res;
        console.log(this.rmList['BANK_RM']);
        this.bankRmList = this.rmList['BANK_RM'] !== undefined ? this.rmList['BANK_RM'] : '';
        this.customerRmList = this.rmList['CUSTOMER_RM'] !== undefined ? this.rmList['CUSTOMER_RM'] : '';
        this.loadAssignRmList();
      });
  }

  onChangeType(userType) {
    console.log('userType ' + userType);
    this.loadAssignRmList();
  }
}