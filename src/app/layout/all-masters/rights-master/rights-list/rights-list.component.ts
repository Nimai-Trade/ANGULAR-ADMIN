import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllMasterService } from '../../all-masters.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { RightsAddComponent } from '../rights-add/rights-add.component';
import { RightsViewComponent } from '../rights-view/rights-view.component';

@Component({
  selector: 'app-rights-list',
  templateUrl: './rights-list.component.html',
  styleUrls: ['./rights-list.component.scss']
})
export class RightsListComponent implements OnInit {

  rightForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  rightListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  rightList: any = [];
  displayColumns: string[] = ['rightName', 'rightShortName', 'createdBy', 'createdDate', 'Status', 'actions'];
  result = '';

  constructor(private formBuilder: FormBuilder, private service: AllMasterService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.rightForm = formBuilder.group({
      rightId: [],
      rightName: [],
      rightShortName: [],
      rightStatus: [],
      createdBy: [],
      createdDate: []
    });
  }
  ngOnInit() {
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadRightList();
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
    this.loadRightList();
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
    this.loadRightList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadRightList();
  }

  loadRightList() {
    this.service.getRightList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res: any) {
    if (res !== undefined) {
      this.rightList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.rightList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.rightList);
    }
  }
  openRightDialog(title, id): void {
    const dialogRef = this.dialog.open(RightsAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadRightList();
    });
  }
  onPreview(id) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(RightsViewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Right Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadRightList();
    });
  }

  confirmDialog(status, rightId): void {
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
          'rightId': rightId,
          'status': updateStatus
        };
        this.service.updateRightStatus(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadRightList()
          });
      }
    });
  }




}
