import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatDialog } from '@angular/material';
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

  constructor(private formBuilder: FormBuilder, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) { }

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
}
