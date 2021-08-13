import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { SubscriptionAddComponent } from '../subscription-add/subscription-add.component';
import { SubscriptionViewComponent } from '../subscription-view/subscription-view.component';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-subscription-action',
  templateUrl: './subscription-action.component.html',
  styleUrls: ['./subscription-action.component.scss']
})
export class SubscriptionActionComponent implements OnInit {


  subscriptionForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  vasListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  vasList: any = [];
  displayColumns: string[] = ['position','countryName', 'planName', 'credits', 'subsidiaries', 'rm', 'validity', 'pricing', 'status', 'actions'];
  result = '';
  countryList: any;
  countryData: any = [];
  countryVal : any;
  user : any;

  constructor(private formBuilder: FormBuilder, private service: SubscriptionService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.subscriptionForm = formBuilder.group({
      country: [],
      customerType: ['CUSTOMER', Validators.required],
      status: []
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('nimaiId');
    console.log("this.user---",this.user)
    this.getCountryList();
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadSubsriptionList();
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
    this.loadSubsriptionList();
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
    this.loadSubsriptionList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadSubsriptionList();
  }

  loadSubsriptionList() {
    this.service.getSubscriptionList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.subscriptionForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.vasList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        //console.log(item);
        this.vasList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.vasList);
    }
  }

  openSubDialog(title, id): void {
    const dialogRef = this.dialog.open(SubscriptionAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadSubsriptionList();
    });
  }

  onPreview(id, status) {
    console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(SubscriptionViewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Subscription Plan Details', id: id, status: status },
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
        this.countryData.push('All');
        for (let entry of this.countryList) {
          this.countryData.push(entry.country);
        }
      });
  }

  onChangeType(country) {
   // console.log(this.countryVal);
    this.subscriptionForm.get('country').setValue(this.countryVal);
    //console.log(this.subscriptionForm['controls'].country +' >> Country Type << ' + country);
    this.loadSubsriptionList();
  }

  onTypeChange() {
    this.setPagerConfig();
    this.loadSubsriptionList();
  }

  confirmDialog(status, data): void {
    const message = 'Are you sure you want to ' + status +' this Subscription Plan?';
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
        if (status === 'Approve') {
          updateStatus = 'Approved';
        } else {
          updateStatus = 'Rejected';
        } 
        const reqData = {
          'subscriptionPlanId': data.subscriptionPlanId,
          'status': updateStatus,
          'countryName':data.countryName,
          'modifiedBy': localStorage.getItem('nimaiId'),
          'customerType':data.customerType
        };
        this.service.updateSubscriptionStatus(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadSubsriptionList();
          });
      }
    });
  }

   ActiveInactiveDialog(status, subId, country): void {
    const message = 'Are you sure you want to ' + (status === 'Active' ? 'inactive' : 'active') + ' record ?';
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
        if (status === 'Active') {
          updateStatus = 'Inactive';
        } else {
          updateStatus = 'Active';
        }
        const reqData = {
          'subscriptionPlanId': subId,
          'status': updateStatus,
          'countryName':country,
          'modifiedBy': localStorage.getItem('nimaiId')
        };
        this.service.updateSubscriptionStatus(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadSubsriptionList();
          });
      }
    });
  }

}