import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { SelectionModel } from '@angular/cdk/collections';
import { RoleAddComponent } from '../role-add/role-add.component';
import { RoleViewComponent } from '../role-view/role-view.component';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {


  roleForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  roleListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  roleList: any = [];
  displayColumns: string[] = ['roleName', 'roleShortName', 'createdBy', 'createdDate', 'roleStatus', 'actions'];
  result = '';

  constructor(private formBuilder: FormBuilder, private service: AllMasterService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.roleForm = formBuilder.group({
      roleId: [],
      roleName: [],
      roleStatus: [],
      createdBy: [],
      createdDate: [],
      roleShortName: []
    });
  }

  ngOnInit() {
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadRoleList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'createdDate',
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
    this.loadRoleList();
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
    this.loadRoleList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadRoleList();
  }

  loadRoleList() {
    this.service.getRoleList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize,  this.pagerConfig.sortBy, this.pagerConfig.direction).subscribe((res) => this.onSuccess(res));
  }
  
  onSuccess(res: any) {
    if (res !== undefined) {
      this.roleList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.roleList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.roleList);
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
      this.loadRoleList();
    });
  }

  onPreview(id) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(RoleViewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Role Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadRoleList();
    });
  }

  confirmDialog(status, roleId): void {
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
          'roleId': roleId,
          'status': updateStatus
        };
        this.service.updateRoleStatus(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadRoleList();
          });
      }
    });
  }
}
