import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerService } from '../customer.service';
import { PaymentPlanDetailsComponent } from '../payment-plan-details/payment-plan-details.component';
import { CustomerKycComponent } from '../customer-kyc/customer-kyc.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  searchData: any;
  customerListForm: any;
  kycStatusList: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position', 'userid', 'firstName', 'lastName', 'mobileNumber', 'emailAddress', 'registeredCountry', 'companyName', 'modeOfPayment', 'totalTxn', 'kycStatus', 'actions'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  transactionList: any = [];
  userRole: any;

  eventStartTime = new Date();

  constructor(private formBuilder: FormBuilder, private router: Router, private service: CustomerService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.customerListForm = formBuilder.group({
      txtStatus: [],
      userId: [],
      emailId: [],
      mobileNo: [],
      companyName: [],
      country: [],
      role: []
    });
  }

  ngOnInit() {
    // get and parse the saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('customerSearch'));
    Object.keys(savedData).forEach(name => {
      if (this.customerListForm.controls[name]) {
        this.customerListForm.controls[name].patchValue(savedData[name]);
      }
    });

    // console.log('Role '+localStorage.getItem('role'));
    this.customerListForm.controls['role'].patchValue(localStorage.getItem('role'));
    this.userRole = localStorage.getItem('role');
    this.kycStatusList = [{ 'code': 'ALL', 'name': 'ALL' }, { 'code': 'Pending', 'name': 'Pending' }, { 'code': 'Approved', 'name': 'Approved' }, { 'code': 'Rejected', 'name': 'Rejected' }, { 'code': 'Not Uploaded', 'name': 'Not Uploaded' }];
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadCustomerList();
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
    this.loadCustomerList();
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
    this.loadCustomerList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadCustomerList();
  }

  loadCustomerList() {
    this.service.getTransactionList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.customerListForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.transactionList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        this.transactionList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.transactionList);
    }
  }

  onChangeType(transactionType) {
    this.loadCustomerList();
  }

  onPreview(id) {
    const dialogRef = this.dialog.open(CustomerDetailsComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Customer Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadTransactionList();
    });
  }

  showTransaction(id) {
    console.log(id)
    if (id !== undefined) {
      localStorage.setItem('userId', id);
      this.customerListForm.controls['userId'].setValue(id);
      this.customerListForm.controls['emailId'].setValue('');
      // this.customerListForm.controls['mobileNo'].setValue('');
      // this.customerListForm.controls['companyName'].setValue('');
      // this.customerListForm.controls['country'].setValue('');
      localStorage.setItem('transactonSearch', JSON.stringify(this.customerListForm.value));
      this.router.navigate(['app', 'transactions', 'transactions-list']);
    } else {

    }
  }

  showPayment(id) {
    const dialogRef = this.dialog.open(PaymentPlanDetailsComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Plan and Payments', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadTransactionList();
    });
  }

  showKyc(id) {
    const dialogRef = this.dialog.open(CustomerKycComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'KYC Details', id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCustomerList();
    });
  }

}
