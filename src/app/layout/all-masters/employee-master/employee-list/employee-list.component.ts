import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeePreviewComponent } from '../employee-preview/employee-preview.component';




@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  employeeListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  employeeList: any = [];
  displayColumns: string[] = ['empCode', 'empName', 'empLastName', 'designation', 'empMobile', 'reportingManager', 'status' ,'actions'];
  result = '';
  loading = false;
  rightList : any;
  myRights : any;
  statusList : any;

  constructor(private formBuilder: FormBuilder, private service: AllMasterService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.employeeListForm = formBuilder.group({
      empId: [],
      empName: [],
      empMobile: [],
      status: [],
    });
  }

  ngOnInit() {
    this.statusList = [{ 'code': 'ACTIVE', 'name': 'Active' }, { 'code': 'INACTIVE', 'name': 'Inactive' }, { 'code': 'Pending', 'name': 'Pending' },{ 'code': 'Rejected', 'name': 'Rejected' }];
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.setPagerConfig();   
    
  }


  ngAfterViewInit() {
    this.loadEmployeeList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'lastModifiedDate',
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
    this.loadEmployeeList();
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
    this.loadEmployeeList();
    
  }


  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.service.getEmployeeList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.employeeListForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.employeeList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {        
        this.employeeList.push(item);
        console.log(item.status)
      });
      this.dataSource = new MatTableDataSource(this.employeeList);
    }

  }


  openEmployeeDialog(title, id): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadEmployeeList();
    });
  }
  onPreview(id) {    
    const dialogRef = this.dialog.open(EmployeePreviewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'User Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadEmployeeList();
    });
  }

  confirmDialog(status, empId): void {
    const message = 'Are you sure you want to ' + (status === 'ACTIVE' ? 'inactive' : 'active') + ' record ?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
     // maxWidth: '550px',
      data: dialogData,
      width: '45%',
      height: '30%'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        if (status === 'ACTIVE') {
          updateStatus = 'INACTIVE';
        } else {
          updateStatus = 'ACTIVE';
        }
        const reqData = {
          'empId': empId,
          'status': updateStatus
        };
        this.service.updateEmployeeStatus(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadEmployeeList()
          });
      }
    });
  }

  onChangeType() {
    this.setPagerConfig();
    this.loadEmployeeList();
  }
}