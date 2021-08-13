import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/directive/format-datepicker';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { DashboardService } from '../dashboard.service';

declare let google: any;
@Component({
  selector: 'app-cust-rm-dashboard',
  templateUrl: './cust-rm-dashboard.component.html',
  styleUrls: ['./cust-rm-dashboard.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class CustRmDashboardComponent implements OnInit {
  currDate:any=formatDate(new Date(), 'yyyy-MM-dd', 'en');
  befDate:any=formatDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() - 30) ,'yyyy-MM-dd', 'en');

  allTrans: number;
  custAcceptedTr: number;
  custRejectedTr: number;
  custExpiredTr: number;
  allCustomers: number;
  activeTrxns: number;
  expTransactions: number;
  paymentPending: number;
  kycPending: number;
  subsExp: number;
  referrerCount: number;
  custTransaction: any;
  startDate: any;
  endDate: any;

  constructor(private formBuilder: FormBuilder, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) {


  } ngOnInit(): void {
    this.getAllCustTransationStat(null, null);
    this.getAllCustTranCompStat(null, null);
    this.getAllTrCount('Customer', null, null, null);
    this.getCusAccptTrCount('Accepted', null, null);
    this.getCustRejectedTrCount('Rejected', null, null);
    this.getCustExpiredTrCount('Expired', null, null);
    this.getAllCustomersCount('Customer', null, null);
    this.getActiveCustomerTransCount();
    this.getTransEXpiryCount();
    this.getPayPendingCount();
    this.getKycPendingCount();
    this.getSubsExpCount();
    this.getReferrerCount();
  }

  getAllTrCount(subscriberType, bankType, dateFrom, dateTo) {
    this.service.getAllTransStat(subscriberType, bankType, dateFrom, dateTo).subscribe((res) => this.allTrans = res);
  }
  getCusAccptTrCount(status, dateFrom, dateTo) {
    this.service.getCustAccptdTransStat(status, dateFrom, dateTo).subscribe((res) => this.custAcceptedTr = res);
  }

  getCustRejectedTrCount(status, dateFrom, dateTo) {
    this.service.getCustRejectedTransStat(status, dateFrom, dateTo).subscribe((res) => this.custRejectedTr = res);
  }
  getCustExpiredTrCount(status, dateFrom, dateTo) {
    this.service.getCustExpiredTransStat(status, dateFrom, dateTo).subscribe((res) => this.custExpiredTr = res);
  }
  getAllCustomersCount(subscriberType, dateFrom, dateTo) {
    this.service.getAllCustomers(subscriberType, dateFrom, dateTo).subscribe((res) => this.allCustomers = res);
  }
  getActiveCustomerTransCount() {
    this.service.getActiveCustomerTrans().subscribe((res) => this.activeTrxns = res);
  }
  getTransEXpiryCount() {
    this.service.getTransExpiry('Customer').subscribe((res) => this.expTransactions = res);
  }
  getPayPendingCount() {
    this.service.getPayPending('Customer').subscribe((res) => this.paymentPending = res);
  }
  getKycPendingCount() {
    this.service.getCustKycPending('Customer').subscribe((res) => this.kycPending = res);
  }
  getSubsExpCount() {
    this.service.getCustSubscriptionExpiry('Customer',null).subscribe((res) => this.subsExp = res);
  }
  getReferrerCount() {
    this.service.getReferrer('Referrer').subscribe((res) => this.referrerCount = res);
  }

  getAllCustTransationStat(dateFrom, dateTo) {
    this.service.getCustTransactionalStat('Customer', dateFrom, dateTo).subscribe((res) => {

      this.custTransaction = JSON.parse(JSON.stringify(res))
      var header_country = ['month', 'Volume', 'Count'];
      var data_country = [];
      data_country.push(header_country);
      for (var i = 0; i < this.custTransaction.length; i++) {
        var temp = [];
        temp.push(this.custTransaction[i].month + "-" + Number(this.custTransaction[i].day));
        temp.push(Number(this.custTransaction[i].cumulative_amount));
        temp.push(Number(this.custTransaction[i].trxn_count));
        
        data_country.push(temp);
      }

      google.charts.load('current', { 'packages': ['corechart', 'bar'] });
      google.charts.setOnLoadCallback(() => this.drawBarChartTransStat(data_country));
    }, (error) => {

    }
    );
  }
  drawBarChartTransStat(data_country) {

    var data = google.visualization.arrayToDataTable(data_country);
    // Set chart options
    var options = {
      title: '',
      vAxes: {
        "0": {
          title: "amount"
        },
        "1": {
          title: "count"
        }
      },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      //series: {1: {type: 'line'}},
      series: {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1, type: 'line' }
      }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('cust_transaction_chart'));
    google.visualization.events.addListener(chart, 'error', function (googleError) {
      google.visualization.errors.removeError(googleError.id);
  });
    chart.draw(data, options);
  }
//----------
  
getAllCustTranCompStat(dateFrom, dateTo) {
  this.service.getCustTComp(dateFrom, dateTo).subscribe((res) => {

    this.custTransaction = JSON.parse(JSON.stringify(res))
    var header_country = ['month','Confirmation','Discounting','Refinance','Confirm And Discount','Banker'];
    var data_country = [];
    data_country.push(header_country);
    for (var i = 0; i < this.custTransaction.length; i++) {
      var temp = [];
      // temp.push(this.custTransaction[i].month + "-" + Number(this.custTransaction[i].day));
      // temp.push((this.custTransaction[i].requirement_type));
      temp.push(this.custTransaction[i].month+' '+(Number(this.custTransaction[i].day)));
      temp.push(Number(this.custTransaction[i].Confirmation));
      temp.push(Number(this.custTransaction[i].Discounting));
      temp.push(Number(this.custTransaction[i].Refinance));
      temp.push(Number(this.custTransaction[i].ConfirmAndDiscount));
      temp.push(Number(this.custTransaction[i].Banker));


      // temp.push(Number(this.custTransaction[i].transactions));
      
      data_country.push(temp);
    }

    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(() => this.drawBarChartTranCompStat(data_country));
  }, (error) => {

  }
  );
}
drawBarChartTranCompStat(data_country) {

  var data = google.visualization.arrayToDataTable(data_country);
  // Set chart options
  var options = {
    title: '',
   
    hAxis: { title: 'Month' },
    seriesType: 'line',
    //series: {1: {type: 'line'}},
    
  };

  var chart = new google.visualization.LineChart(document.getElementById('transaction_comp'));
  google.visualization.events.addListener(chart, 'error', function (googleError) {
    google.visualization.errors.removeError(googleError.id);
});
  chart.draw(data, options);
}

//------------------
  custStatReload(strtDate, endDate) {
    this.getAllCustTransationStat(strtDate, endDate);
    this.getAllCustTranCompStat(strtDate, endDate)
    this.getAllTrCount('Customer', null, strtDate, endDate);
    this.getCusAccptTrCount('Accepted', strtDate, endDate);
    this.getCustRejectedTrCount('Rejected', strtDate, endDate);
    this.getCustExpiredTrCount('Expired', strtDate, endDate);
    this.getAllCustomersCount('Customer', strtDate, endDate);
  }
  changeTranStart(event: MatDatepickerInputEvent<Date>) {
    let formatedDate = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en');
    this.startDate = formatedDate;
    if (this.startDate != null && this.endDate != null) {
      this.custStatReload(this.startDate, this.endDate);
    }
  }
  changeTranEnd(event: MatDatepickerInputEvent<Date>) {
    let formatedDate = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en');
    this.endDate = formatedDate;
    if (this.startDate != null && this.endDate != null) {
      this.custStatReload(this.startDate, this.endDate);
    }
  }
}

