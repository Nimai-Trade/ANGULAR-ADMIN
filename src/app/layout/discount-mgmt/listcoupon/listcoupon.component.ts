import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DiscountMgmtService } from '../discount-mgmt.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AddcouponComponent } from '../addcoupon/addcoupon.component';
import { formatDate,CommonModule } from '@angular/common';
import { PreviewcouponComponent } from '../previewcoupon/previewcoupon.component';
@Component({
  selector: 'app-listcoupon-list',
  templateUrl: './listcoupon.component.html',
  styleUrls: ['./listcoupon.component.scss']
})
export class ListcouponComponent implements OnInit {

  CouponForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  CouponListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  CouponList: any = [];
  displayColumns: string[] = ['coupon','country','status', 'discountType', 'couponDiscount', 'couponFor', 'subscriptionPlan', 'startDate','endDate','quantity','actions'];
  result = '';
  loading = false;
  public date: string = formatDate(new Date(), "dd-MM-yyyy'T'HH:mm:ss.SSSZ", 'en-US');
  showEdit=true;
  rightList : any;
  myRights : any;
  status:any;
  constructor(private formBuilder: FormBuilder, private service: DiscountMgmtService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.CouponListForm = formBuilder.group({
      empId: [],
      empName: [],
      empMobile: [],
      status: [],
      role:[]
    });
  }
  public dateFormat(date: string): string {
    let formatedDate = formatDate(new Date(date), "dd-MM-yyyy", 'en-US');
    return formatedDate;
  }
  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.CouponListForm.controls['role'].patchValue(localStorage.getItem('role'));
    this.setPagerConfig();   

  }


  ngAfterViewInit() {
    this.loadCouponList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'discountId',
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
    this.loadCouponList();
  }

  onPageChange(event?) {
    // console.log("onPageChange")
    this.masterToggle(false);    
    if (event === undefined) {
    } else {
      this.pagerConfig.sortBy = event.sortBy;
      this.pagerConfig.direction = event.direction;
      this.pagerConfig.pageIndex = event.pageIndex;
      this.pagerConfig.pageSize = event.pageSize;
    }    
    this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadCouponList();
  }


  getStatusData(value){
    this.setPagerConfig();
    this.status=value;
    if(value!=="all"){
      this.service.getCouponStatusList(value,this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction).subscribe((res) => this.onSuccess(res));
    }else{
      this.service.getCouponList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.CouponListForm.value).subscribe((res) => this.onSuccess(res));
   }
  }
  loadCouponList() {
    if(this.status!=="all" && this.status!==undefined){
      this.service.getCouponStatusList(this.status,this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction).subscribe((res) => this.onSuccess(res));
    }else{
      this.service.getCouponList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.CouponListForm.value).subscribe((res) => this.onSuccess(res));
   }
  }
  
  onSuccess(res: any) {    
    if (res !== undefined) {
      this.CouponList = [];
      const totalCount = res.totalElements;      
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        if(item.startDate)
        {
          item.startDate=this.dateFormat(item.startDate)
          item.endDate=this.dateFormat(item.endDate)
        }
        if(item.discountType=='%'){
          item.amount=item.maxDiscount
        }
        item.quantity=item.quantity-item.consumedCoupons
        this.CouponList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.CouponList);
    }

  }


  openCouponDialog(title, id): void {
    const dialogRef = this.dialog.open(AddcouponComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCouponList();
    });
  }

  onPreview(id) {
    const dialogRef = this.dialog.open(PreviewcouponComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Coupon Details', id: id},
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCouponList();
    });
  }
}