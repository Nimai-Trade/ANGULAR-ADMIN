import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { MappingAddComponent } from '../mapping-add/mapping-add.component';

@Component({
  selector: 'app-mapping-list',
  templateUrl: './mapping-list.component.html',
  styleUrls: ['./mapping-list.component.scss']
})
export class MappingListComponent implements OnInit {

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
  displayColumns: string[] = ['roleId', 'rightId', 'createdBy', 'createdDate', 'Status'];
  result = '';

  constructor(private formBuilder: FormBuilder, private service: AllMasterService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.roleForm = formBuilder.group({
      userRightsId: [],
      roleName: [],
      rightsName: [],
      createdBy: [],
      createdDate: [],
      lastModifiedBy: [],
      lastModifiedDate: [],
      status: []
    });
  }


  ngOnInit() {
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadRoleRightsList();
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
    this.loadRoleRightsList();
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
    this.loadRoleRightsList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadRoleRightsList();
  }

  loadRoleRightsList() {
    this.service.getMappingList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize,  this.pagerConfig.sortBy, this.pagerConfig.direction).subscribe((res) => this.onSuccess(res));
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

  openRoleRightMappingDialog(title, id): void {
    const dialogRef = this.dialog.open(MappingAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadRoleRightsList();
    });
  }

  onPreview(id) {
    console.log('>>>> ' + id);
    // const dialogRef = this.dialog.open(RoleViewComponent, {
    //   width: '40%',
    //   height: '50%',
    //   data: { title: 'Role Details', id: id },
    //   disableClose: true
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.loadRoleList();
    // });
  }

  confirmDialog(status, roleId): void {
    // const message = 'Are you sure you want to ' + (status === 'ACTIVE' ? 'inactive' : 'active') + ' record ?';
    // const dialogData = new ConfirmDialogModel('Confirm Action', message);
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   maxWidth: '400px',
    //   data: dialogData
    // });

    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   this.result = dialogResult;
    //   let updateStatus = '';
    //   if (dialogResult) {
    //     if (status === 'ACTIVE') {
    //       updateStatus = 'INACTIVE';
    //     } else {
    //       updateStatus = 'ACTIVE';
    //     }
    //     const reqData = {
    //       'roleId': roleId,
    //       'status': updateStatus
    //     };
    //     this.service.updateRoleStatus(reqData).subscribe(
    //       (res) => {
    //         this.sharedUtilService.showSnackBarMessage(res['message']);
    //         this.loadRoleList();
    //       });
    //   }
    // });
  }
}
