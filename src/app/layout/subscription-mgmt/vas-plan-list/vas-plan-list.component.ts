import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { VasPlanAddComponent } from '../vas-plan-add/vas-plan-add.component';
import { VasPlanViewComponent } from '../vas-plan-view/vas-plan-view.component';

@Component({
  selector: 'app-vas-plan-list',
  templateUrl: './vas-plan-list.component.html',
  styleUrls: ['./vas-plan-list.component.scss']
})
export class VasPlanListComponent implements OnInit {

  vasForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  vasListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  vasList: any = [];
  displayColumns: string[] = ['position','customerType','countryName', 'planName', 'pricing', 'description1', 'createdDate', 'status', 'actions'];
  result = '';
  countryList: any;
  rightList : any;
  myRights : any;
  countryVal : any;
  countryData: any = [];
  role : any;
  isRole: boolean=false;

  constructor(private formBuilder: FormBuilder, private service: SubscriptionService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.vasForm = formBuilder.group({
      country: []
    });
  }

  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.role = localStorage.getItem('role');
    if(this.role === 'Management' || this.role==='Ops Edit' || this.role === 'Ops Admin'){
      this.isRole=true;
    }
    this.getCountryList();  
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadVasList();
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
    this.loadVasList();
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
    this.loadVasList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadVasList();
  }

  loadVasList() {
    this.service.getVasList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize,  this.pagerConfig.sortBy, this.pagerConfig.direction, this.vasForm.value).subscribe((res) => this.onSuccess(res));
  }
  
  onSuccess(res: any) {
    if (res !== undefined) {
      this.vasList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.vasList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.vasList);
    }
  }

  openVasDialog(title, id): void {
    const dialogRef = this.dialog.open(VasPlanAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadVasList();
    });
  }

  onPreview(id, status) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(VasPlanViewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'VAS Plan Details', id: id, status: status},
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadRoleList();
    });
  }

  
  getCountryList() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;
        for (let entry of this.countryList) {
          this.countryData.push(entry.country);
        }
      });
  }

  onChangeType() {
    console.log(this.countryVal);
    this.vasForm.get('country').setValue(this.countryVal);
    console.log(this.vasForm['controls'].country);  
    this.loadVasList();
  }

  // confirmDialog(status, roleId): void {
  //   const message = 'Are you sure you want to ' + (status === 'ACTIVE' ? 'inactive' : 'active') + ' record ?';
  //   const dialogData = new ConfirmDialogModel('Confirm Action', message);
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     maxWidth: '400px',
  //     data: dialogData
  //   });

  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     this.result = dialogResult;
  //     let updateStatus = '';
  //     if (dialogResult) {
  //       if (status === 'ACTIVE') {
  //         updateStatus = 'INACTIVE';
  //       } else {
  //         updateStatus = 'ACTIVE';
  //       }
  //       const reqData = {
  //         'roleId': roleId,
  //         'status': updateStatus
  //       };
  //       this.service.updateRoleStatus(reqData).subscribe(
  //         (res) => {
  //           this.sharedUtilService.showSnackBarMessage(res['message']);
  //           this.loadRoleList();
  //         });
  //     }
  //   });
  }