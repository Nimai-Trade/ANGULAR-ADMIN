import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/directive/format-datepicker';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-opsadmin-dashboard',
  templateUrl: './opsadmin-dashboard.component.html',
  styleUrls: ['./opsadmin-dashboard.component.scss']
})
export class OpsadminDashboardComponent implements OnInit {
  payAwaitedCount: number;
  paymentApprovalCount: number;
  assignRmCOunt: number;
  grantRmPending: number;
  grantUserCount: number;
  pendingKycApprovalCount: number;
  grantKycCount: number;
  pendingKycDrop: number;
  subscriberType: string;
  bankType: string;
    subsExpiryCount: any;
    paymenPending: any;
    subsType: string[] = ['All', 'Customer', 'Bank As Customer', 'Bank as UnderWriter','Refferer']


  constructor(private formBuilder: FormBuilder ,private router: Router, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) { }

  ngOnInit() {
    this.cdr.detectChanges();
    this.getPaymentConf();
    this.getPaymentApp();
    this.getAssignRmCount();
    this.getGrantRm();
    this.getGrantUSer();
    this.getKycApprovalPending();
    this.getGrantKyc();
    this.getPendingKyc();
  }
  getPaymentConf() {
    this.service.getPayConfAwaited().subscribe(
        (res) => {
            this.payAwaitedCount = res;
        });
}
getPaymentApp() {
    this.service.getPayApproval().subscribe(
        (res) => {
            this.paymentApprovalCount = res;
        });
}
getAssignRmCount() {
    this.service.getAssgRmCount().subscribe((res) => {
        this.assignRmCOunt = res;
    });
}
getGrantRm() {
    this.service.getGrantRmCount().subscribe((res) => {
        this.grantRmPending = res;
    })
}
getGrantUSer() {
    this.service.getGrantUserCount().subscribe((res) => {
        this.grantUserCount = res;
    })
}
getKycApprovalPending() {
    this.service.getPendingKycAppCount().subscribe((res) => {
        this.pendingKycApprovalCount = res;
    })
}
getGrantKyc() {
    this.service.getGrantKycCount().subscribe((res) => {
        this.grantKycCount = res;
    })
}
getPendingKyc() {
    this.service.getPendingKycCount("All", "").subscribe((res) => {
        this.pendingKycDrop = res;
    })
}


pendingKycCount(subs) {
      
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
      this.payAwaitedCount =res.paymentApproval
      this.paymentApprovalCount=res.grantPayment
      this.assignRmCOunt=res.assignRm
      this.grantRmPending=res.grantRM
      this.grantUserCount=res.grantUser
      this.pendingKycApprovalCount=res.kycApproval
      this.grantKycCount=res.grantKyc
      this.pendingKycDrop=res.kycPendingUser
      this.subsExpiryCount=res.subPlanExpiring30Days
      this.paymenPending=res.paymentPendingUser      
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
  this.router.navigate(['app', 'assignRm']);
}
if(status=='grant-rm'){
  this.router.navigate(['app', 'grant-rm']);
}
}

}
