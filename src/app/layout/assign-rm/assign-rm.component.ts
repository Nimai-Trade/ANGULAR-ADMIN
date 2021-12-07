import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { RoleAddComponent } from '../all-masters/role-master/role-add/role-add.component';
import { RoleViewComponent } from '../all-masters/role-master/role-view/role-view.component';
import { AssignRmService } from './assign-rm.service';
import { ConfirmationDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-assign-rm',
  templateUrl: './assign-rm.component.html',
  styleUrls: ['./assign-rm.component.scss']
})
export class AssignRmComponent implements OnInit {

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
  displayColumns: string[] = ['position','userid', 'insertedDate', 'subscriberType', 'companyName', 'countryName', 'firstName', 'lastName', 'relationshipManager', 'actions'];
  result = '';

  constructor(private formBuilder: FormBuilder, private service: AssignRmService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.assignRmForm = formBuilder.group({
      userType: []
    });
  }

  ngOnInit() {
    this.setPagerConfig();
    this.getRmList();
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
    // this.loadAssignRmList();
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
      //  console.log(item);
        this.customerList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.customerList);
    }
  }

  openRoleDialog(title, id): void {
    const dialogRef = this.dialog.open(RoleAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAssignRmList();
    });
  }

  onPreview(id) {
    //console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(RoleViewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Role Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAssignRmList();
    });
  }

  confirmDialog(userId, rm): void {
    //console.log("rm value ---",rm)
    const message = 'Are you sure you want to Assign ' + rm.value + ' To User ' + userId +'?';
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
        const reqData = {
          'userId': userId,
          'rm': rm.code,
          'status':'Pending'
        };
        this.service.updateRM(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadAssignRmList();
          });
      }
    });
  }

  getRmList() {
    this.service.getRmList().subscribe(
      (res) => {
        console.log("Rm List----",res);
        this.rmList = res;
      //  console.log(this.rmList['BANK_RM']);
        this.bankRmList = this.rmList['BANK_RM'] !== undefined ? this.rmList['BANK_RM'] : '';
        this.customerRmList = this.rmList['CUSTOMER_RM'] !== undefined ? this.rmList['CUSTOMER_RM'] : '';
        this.loadAssignRmList();
      });
  }

  onChangeType(userType) {
  //  console.log('userType ' + userType);
    this.loadAssignRmList();
  }
}
