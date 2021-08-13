import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { RefundCreditService } from '../refund-credit.service';
@Component({
  selector: 'app-refund-credit',
  templateUrl: './refund-credit.component.html',
  styleUrls: ['./refund-credit.component.scss']
})
export class RefundCreditComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private service: RefundCreditService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.assignRmForm = formBuilder.group({
      userType: [],
      status:'Pending'
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('nimaiId');
    this.setPagerConfig();
    this.userTypeList = [{ 'code': '', 'name': 'ALL' }, { 'code': 'CU', 'name': 'CUSTOMER' }, { 'code': 'BA', 'name': 'BANK' }, { 'code': 'RE', 'name': 'REFERRER' }, { 'code': 'BC', 'name': 'BANK AS CUSTOMER' }];

  }


  ngAfterViewInit() {
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


 

}
