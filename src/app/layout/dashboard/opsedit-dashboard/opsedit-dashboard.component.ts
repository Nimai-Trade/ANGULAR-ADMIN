import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
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
  constructor(private formBuilder: FormBuilder, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) { }

  ngOnInit() {
    this.cdr.detectChanges();
    this.getPaymentConf();
    this.getKycApp();
    this.getAssignRmCount();
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
}
