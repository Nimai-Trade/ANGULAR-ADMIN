import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { PaymentApprovalService } from '../payment-approval.service';
@Component({
  selector: 'app-payment-approval',
  templateUrl: './payment-approval.component.html',
  styleUrls: ['./payment-approval.component.scss']
})
export class PaymentApprovalComponent implements OnInit {

  searchData: any;
  paymentApprovalForm: any;
  statusList: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position', 'userid', 'firstName', 'lastName', 'emailAddress', 'mobileNumber', 'nimaiSubscriptionDetailsList', 'registeredCountry', 'paymentStatus', 'actions'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  paymentList: any = [];
  userRole: any;
  result = '';
  countryList: any;
  countryData: any = [];
  countryVal : any;
  user : any;
  eventStartTime = new Date();
  typeOfPayment : any;
  reqData:any;
  status: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: PaymentApprovalService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.paymentApprovalForm = formBuilder.group({
      userId: [],
      country: [],
      status:[],
      userType:[],
      paymentType:[]
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('nimaiId');

    if( localStorage.getItem('PaymentApproval')){
      this.status= localStorage.getItem('fromDashBoardStatus')  ;
    }else{
      this.status= localStorage.getItem('fromDashBoardStatus')  ;
    }
    localStorage.removeItem('fromDashBoardStatus')

    this.getCountryList();
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadPaymentList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'paymentDate',
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
    if(this.typeOfPayment==="grantVasPayment"){
      this.loadVasPaymentList();
    }else{
      this.loadPaymentList();
    }
  }
  onGrantPaymentChange(event){
   // console.log(event.value)
    this.typeOfPayment=event.value;
    this.setPagerConfig();
    if(event.value==="grantVasPayment"){
      this.loadVasPaymentList();
    }else{
      this.loadPaymentList();
    }
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
    if(this.typeOfPayment==="grantVasPayment"){
      this.loadVasPaymentList();
    }else{
      this.loadPaymentList();
    }
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    if(this.typeOfPayment==="grantVasPayment"){
      this.loadVasPaymentList();
    }else{
      this.loadPaymentList();
    }
  }

  loadPaymentList() {
   // console.log(this.paymentApprovalForm.controls['country'].value)
    this.service.getWireTransferList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.paymentApprovalForm.value,this.status).subscribe((res) => this.onSuccess(res));
  }
  loadVasPaymentList(){
    this.service.getvasWireTransferList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.paymentApprovalForm.value).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res: any) {
    if (res !== undefined) {
      this.paymentList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        this.paymentList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.paymentList);
    }
  }

  paymentAction(element, status){
   // console.log('status ' + status + ' id ' + element.userid);
   let msgStatus=""
   if(status==="Approved"){
     msgStatus="Approve"
   }else{
     msgStatus="Reject"
   }
    const message = 'Are you sure you want to ' + msgStatus + ' the Payment?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '50%',
      height: '45%',
      data: dialogData
    });
console.log('kjkj')
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      // console.log(' >>> '+this.result);
      let updateStatus = '';
      // console.log("element.planId---",element.planId)
    //  return;
      if (dialogResult) {
        // console.log("this.typeOfPayment--",this.typeOfPayment)
        if(this.typeOfPayment==="grantVasPayment"){
          this.reqData = {
            'userId': element.userid,
            'status': status,
            'vasid':element.planId,
            'vasCheckerComment': this.result['data'],
            'comment':this.result['data']
          };
        }else{
          this.reqData= {
            'userId': element.userid,
            'status': status,
            'subcriptionId':element.planId,
            'checkerComment': this.result['data'],
            'comment':this.result['data']
          };
         
        }
       
        this.service.updatePaymentStatus(this.reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            if(this.typeOfPayment==="grantVasPayment"){
              this.loadVasPaymentList();
            }else{
              this.loadPaymentList();
            }
            
          });
      }
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
    this.paymentApprovalForm.get('country').setValue(this.countryVal);
    if(this.typeOfPayment==="grantVasPayment"){
      this.loadVasPaymentList();
    }else{
      this.loadPaymentList();
    }
  }

}
