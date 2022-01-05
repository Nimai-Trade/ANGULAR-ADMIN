import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/directive/format-datepicker';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-opsedit-dashboard',
  templateUrl: './opsedit-dashboard.component.html',
  styleUrls: ['./opsedit-dashboard.component.scss']
})
export class OpseditDashboardComponent implements OnInit {
  payAwaitedCount: number;
  kycApprovalCount: number;
  assignRmCOunt: number;
   subsGrantCount: number;
  vasGrantCount: number;
  disCoupGrantCount: number;
  overAllCustCount: number;
  overAllRefCount: number;
  bankAsCustCount: number;
  bankAsUwCount: number;
  overAllCustRejTransc: number;
  overAllCustExpiredTransc: number;
  subsExpiryCount: any;
  paymenPending: any;
  pendingKycDrop: any;
  subscriberType: string;
  bankType: string;
  paymentApprovalCount: any;
  grantRmPending: any;
  pendingKycApprovalCount: any;
  grantKycCount: any;
  grantUserCount: any;
  subsType: string[] = ['All', 'Customer', 'Bank As Customer', 'Bank as UnderWriter','Refferer']
  isAll: boolean;

  constructor(private formBuilder: FormBuilder,private router: Router, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) { }

  ngOnInit() {
    this.cdr.detectChanges();
    // this.getPaymentConf();
    // this.getKycApp();
    // this.getAssignRmCount();
    this.subscriberType="All";
    this.getPendingRequests()
  }
  getPaymentConf() {
    this.service.getPayConfAwaited().subscribe(
        (res) => {
            this.payAwaitedCount = res;
        });
}
getKycApp() {
    this.service.getPendingKycAppCount().subscribe(
        (res) => {
            this.kycApprovalCount = res;
        });
}
getAssignRmCount() {
    this.service.getAssgRmCount().subscribe((res) => {
        this.assignRmCOunt = res;
    });
}


pendingKycCount(subs) {
  this.isAll=true;
  if(subs.value=="All"){
    this.isAll=false;
  }
  if (subs.value == "Bank As Customer") {
      this.subscriberType = "Bank";
      this.bankType = "Customer";
  } else if (subs.value == "Bank as UnderWriter") {
      this.subscriberType = "Bank";
      this.bankType = "Underwriter";
  } else if (subs.value == "Referrer") {
      this.subscriberType = "Bank";
      this.bankType = "";
  }
  else {
      this.subscriberType = subs.value;
      this.bankType = "";
  }
//   this.service.getPendingKycCount(this.subscriberType, this.bankType).subscribe((res) => {
//       this.pendingKycDrop = res;
//   })
this.getPendingRequests();
}

getPendingRequests() {    
this.service.getPendingRequests(localStorage.getItem('role'),this.subscriberType,this.bankType).subscribe((res) => {
    this.payAwaitedCount =res.paymentPendingUser
    this.paymentApprovalCount=res.grantPayment
    this.assignRmCOunt=res.assignRm
    this.grantRmPending=res.grantRM
    this.grantUserCount=res.grantUser
    this.pendingKycApprovalCount=res.kycApproval
    this.grantKycCount=res.grantKyc
    this.pendingKycDrop=res.kycPendingUser
    this.subsExpiryCount=res.subPlanExpiring30Days
    this.paymenPending=res.paymentPendingUser      
    this.kycApprovalCount=res.kycApproval
})
}

showKYCApproval(status){
  
  const data={
    "userId":null,
    "emailId":null,
    "mobileNo":null,
    "companyName":null,
    "country":null
  }
 

  if(status=="confirmAwaited"){
    if(this.bankType == "Underwriter"){
      localStorage.setItem('fromDashBoard', 'yes');
      localStorage.setItem('PaymentApproval', 'PaymentPendingUser');   
      localStorage.setItem('fromDashBoardStatus', 'BANK UNDERWRITER'); 
        localStorage.setItem('bankSearch', JSON.stringify(data));
        this.router.navigate(['app', 'bank', 'bank-list']);
      }     
      else if(this.bankType == "" || this.bankType == 'Customer' ){
        if( this.bankType == '')
        localStorage.setItem('fromDashBoardStatus', 'CUSTOMER');
        if( this.bankType == 'Customer')
        localStorage.setItem('fromDashBoardStatus', 'BANK CUSTOMER');   
        localStorage.setItem('fromDashBoard', 'yes');
        localStorage.setItem('PaymentApproval', 'PaymentPendingUser');    
        localStorage.setItem('customerSearch' , JSON.stringify(data))
      this.router.navigate(['app', 'customer', 'customer-list']);
      }
    }
if(status=='kyc'){
  if(this.bankType == "Underwriter"){
  localStorage.setItem('fromDashBoard', 'yes');
    localStorage.setItem('bankSearch', JSON.stringify(data));
    this.router.navigate(['app', 'bank', 'bank-list']);
  }     
  else if(this.bankType == "" || this.bankType == 'Customer' ){
    localStorage.setItem('fromDashBoard', 'yes');
    localStorage.setItem('customerSearch' , JSON.stringify(data))
  this.router.navigate(['app', 'customer', 'customer-list']);
  }
} 

if(status=='employeeGrant'){
this.router.navigate(['app', 'masters', 'employeeGrant']);
}
if(status=='grant'){
this.router.navigate(['app', 'grantkyc']);
}
if(status=='grant-payment'){
this.router.navigate(['app', 'payment-approval']);
}
if(status=='assign-rm'){
  if(this.bankType==undefined){
      console.log(this.bankType)
}else{
 
          localStorage.setItem('fromDashBoard', 'yes');
          if(this.bankType == "Underwriter" )
          localStorage.setItem('fromDashBoardStatus', 'BA');
          if( this.bankType == 'Customer')
          localStorage.setItem('fromDashBoardStatus', 'BC');               
          
          if( this.bankType == ''){
              if(this.subscriberType=='Customer')
              localStorage.setItem('fromDashBoardStatus', 'CU');
              if(this.subscriberType=='Referrer')
              localStorage.setItem('fromDashBoardStatus', 'RE');
          }           

          this.router.navigate(['app', 'assignRm']);

  }



}
if(status=='grant-rm'){
  if(this.bankType==undefined){
      console.log(this.bankType)
}else{
  localStorage.setItem('fromDashBoard', 'yes');
  if(this.bankType == "Underwriter" )
  localStorage.setItem('fromDashBoardStatus', 'BA');
  if( this.bankType == 'Customer')
  localStorage.setItem('fromDashBoardStatus', 'BC');               
  
  if( this.bankType == ''){
      if(this.subscriberType=='Customer')
      localStorage.setItem('fromDashBoardStatus', 'CU');
      if(this.subscriberType=='Referrer')
      localStorage.setItem('fromDashBoardStatus', 'RE');
  }     
  this.router.navigate(['app', 'grant-rm']);
}
}
}



}
