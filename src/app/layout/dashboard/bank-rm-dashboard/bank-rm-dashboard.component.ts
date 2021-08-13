import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatDialog } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/directive/format-datepicker';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { DashboardService } from '../dashboard.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
declare let google: any;

@Component({
  selector: 'app-bank-rm-dashboard',
  templateUrl: './bank-rm-dashboard.component.html',
  styleUrls: ['./bank-rm-dashboard.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class BankRmDashboardComponent implements OnInit {

  currDate:any=formatDate(new Date(), 'yyyy-MM-dd', 'en');
  befDate:any=formatDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() - 30) ,'yyyy-MM-dd', 'en');

  dashboardData:any;
  allBankCustTran: number;
  bankAcceptedTran: any;
  bankRejectedTrxn:any;
  bankExpiredTrxn:any;
  totalBankAsCust:any;
  totalBankAsUw:any;
  totalQuotes:number;
  acceptedQuotes:number;
  rejectedQuotes:number;
  expiredQuotes:number;
  trxnExpiry:number;
  payPending:number;
  kycPending:number;
  subsExp:number;
  bankUwCount:number;
  bankCustCount:number;
  avgQuotes:any;
  quotesAwaited:number;
  dateFrom: any;
  dateTo: any;
  revDateFrom: string;
  revDateTo: any;
  startDate: any;
  endDate: any;
  custTransaction: any;
  constructor(private formBuilder: FormBuilder, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) { }

  ngOnInit() {
    this.getBankAsCustTransaction('Bank', 'Customer', null, null);
    this.getAllBankTranCompStat(null, null);
    this.getBankAsCustAccepted('Bank', 'Customer', null, null);
    this.getBankAsCustRejected('Bank', 'Customer', null, null);
    this.getBankAsCustExpired('Bank', 'Customer', null, null);
    this.getTotalCustomers('Bank', 'Customer', null, null);
    this.getTotalUnderwriters('Bank', 'Underwriter', null, null);
    this.getTotalQuote('Bank',null,null);
    this.getAcceptedQuotes('Customer',null,null);
    this.getRejectedQuotes('Bank',null,null);
    this.getExpiredQuotes('Bank',null,null);
    this.getAllTransationStat(null, null);
    this.getTrxnExpiry();
    this.getPayPending();
    this.getKycPending();
    this.getSubsExpiryCount();
    this.getBankAsUwCount();
    this.getBankAsCustCount();
    this.getAverageQuotes(null, null);
    this.getBankQuotesAwaited();
  }

  getAllTransationStat(dateFrom, dateTo) {
    this.service.getBankTransStat('Bank', dateFrom, dateTo).subscribe((res) => {

        this.dashboardData = JSON.parse(JSON.stringify(res))
        var header_country = ['month', 'Volume', 'Count'];
        var data_country = [];
        data_country.push(header_country);
        for (var i = 0; i < this.dashboardData.length; i++) {
            var temp = [];
            temp.push(this.dashboardData[i].month + "-" + Number(this.dashboardData[i].day));
            temp.push(Number(this.dashboardData[i].cumulative_amount));
            temp.push(Number(this.dashboardData[i].trxn_count));
           
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

    var chart = new google.visualization.ComboChart(document.getElementById('bank_transaction_chart'));
    google.visualization.events.addListener(chart, 'error', function (googleError) {
      google.visualization.errors.removeError(googleError.id);
  });
    chart.draw(data, options);
}

getAllBankTranCompStat(dateFrom, dateTo) {
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
    google.charts.setOnLoadCallback(() => this.drawBarChartBankTranCompStat(data_country));
  }, (error) => {

  }
  );
}
drawBarChartBankTranCompStat(data_country) {

  var data = google.visualization.arrayToDataTable(data_country);
  // Set chart options
  var options = {
    title: '',
   
    hAxis: { title: 'Month' },
    seriesType: 'line',
    //series: {1: {type: 'line'}},
    
  };

  var chart = new google.visualization.LineChart(document.getElementById('bank_transaction_chart'));
  google.visualization.events.addListener(chart, 'error', function (googleError) {
    google.visualization.errors.removeError(googleError.id);
});
  chart.draw(data, options);
}


getAverageQuotes(dateFrom, dateTo) {
  this.service.getBankAvgQuotes(dateFrom, dateTo).subscribe((res) => {
      console.log(JSON.parse(JSON.stringify(res)))
      this.avgQuotes = JSON.parse(JSON.stringify(res))
      var header_country = ['month', 'Volume'];
      var data_country = [];
      data_country.push(header_country);
      for (var i = 0; i < this.avgQuotes.length; i++) {
          var temp = [];
          temp.push(this.avgQuotes[i].month + "-" + Number(this.avgQuotes[i].day));
          temp.push(Number(this.avgQuotes[i].total_quotes)/Number(this.avgQuotes[i].transaction_count));
          data_country.push(temp);
      }
      google.charts.load('current', { 'packages': ['bar'] });
      google.charts.setOnLoadCallback(() => this.drawAvgQuoteBarChart(data_country));
  }, (error) => {

  });
}
drawAvgQuoteBarChart(data_country) {
  var data = google.visualization.arrayToDataTable(data_country);
  // Set chart options
  var options = {
      title: '',
      vAxes: {
          "0": {
              title: "count"
          }
      },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      //series: {1: {type: 'line'}},
      series: {
          0: { targetAxisIndex: 0 }
          //    1:{targetAxisIndex:1,type: 'line'}
      }
  };

  var chart = new google.visualization.ComboChart(document.getElementById('avg_quote_transaction'));
  google.visualization.events.addListener(chart, 'error', function (googleError) {
    google.visualization.errors.removeError(googleError.id);
});
  chart.draw(data, options);
}



  getBankAsCustTransaction(subscriberType, bankType, dateFrom, dateTo) {
    this.service.getAllTransStat(subscriberType, bankType,dateFrom,dateTo).subscribe((res) =>
      this.allBankCustTran = res
    );
  }
  getBankAsCustAccepted(subscriberType, bankType, dateFrom, dateTo) {
    this.service.getBankAcceptedTran(subscriberType, bankType,'Accepted',dateFrom,dateTo).subscribe((res) =>
      this.bankAcceptedTran = res
    );
  }
  getBankAsCustRejected(subscriberType, bankType, dateFrom, dateTo) {
    this.service.getBankAcceptedTran(subscriberType, bankType,'Rejected',dateFrom,dateTo).subscribe((res) =>
      this.bankRejectedTrxn = res
    );
  }
  getBankAsCustExpired(subscriberType, bankType, dateFrom, dateTo){
    this.service.getBankAcceptedTran(subscriberType, bankType,'Expired',dateFrom,dateTo).subscribe((res) =>
      this.bankExpiredTrxn = res
    );
  }
  getTotalCustomers(subscriberType, bankType, dateFrom, dateTo){
    this.service.getBankCustomers(subscriberType, bankType,dateFrom,dateTo).subscribe((res) =>
      this.totalBankAsCust = res
    );
  }
  getTotalUnderwriters(subscriberType, bankType, dateFrom, dateTo){
    this.service.getBankCustomers(subscriberType, bankType,dateFrom,dateTo).subscribe((res) =>
      this.totalBankAsUw = res
    );
  }
  getTotalQuote(subscriberType,dateFrom,dateTo){
    this.service.getTotalQuotes(subscriberType,dateFrom,dateTo).subscribe((res) =>
      this.totalQuotes = res
    );
  }
  getAcceptedQuotes(subscriberType,dateFrom,dateTo){
    this.service.getQuotesOnStatus(subscriberType,'Accepted',dateFrom,dateTo).subscribe((res) =>
      this.acceptedQuotes = res
    );
  }
  getRejectedQuotes(subscriberType,dateFrom,dateTo){
    this.service.getQuotesOnStatus(subscriberType,'Rejected',dateFrom,dateTo).subscribe((res) =>
      this.rejectedQuotes = res
    );
  }
  getExpiredQuotes(subscriberType,dateFrom,dateTo){
    this.service.getQuotesOnStatus(subscriberType,'Expired',dateFrom,dateTo).subscribe((res) =>
      this.expiredQuotes = res
    );
  }
  getTrxnExpiry(){
    this.service.getTransExpiry('Bank').subscribe((res) =>
      this.trxnExpiry = res
    );
  }
  getPayPending(){
    this.service.getPayPending('Bank').subscribe((res) =>
    this.payPending = res
  );
  }
  getKycPending(){
    this.service.getCustKycPending('Bank').subscribe((res) =>
    this.kycPending = res
  );
  }
  getSubsExpiryCount(){
    this.service.getCustSubscriptionExpiry('Bank','Customer').subscribe((res) =>
    this.subsExp = res
  );
  }

  getBankAsUwCount(){
    this.service.getBankAs('Underwriter').subscribe((res) =>
    this.bankUwCount = res
  );
  }
  getBankAsCustCount(){
    this.service.getBankAs('Customer').subscribe((res) =>
    this.bankCustCount = res
  );
  }

  getBankQuotesAwaited(){
    this.service.getQutesAwaitedBank().subscribe((res) =>
    this.quotesAwaited = res
  );
  }

  statReload(sDate,eDate){
    this.getAllTransationStat(sDate,eDate);
    this.getAllBankTranCompStat(sDate,eDate);
    this.getAverageQuotes(sDate,eDate);
  }

  bankReload(sDate,eDate){
    this.getBankAsCustTransaction('Bank', 'Customer', sDate, eDate);
    this.getBankAsCustAccepted('Bank', 'Customer', sDate, eDate);
    this.getBankAsCustRejected('Bank', 'Customer', sDate, eDate);
    this.getBankAsCustExpired('Bank', 'Customer', sDate, eDate);
    this.getTotalCustomers('Bank', 'Customer', sDate, eDate);
    this.getTotalUnderwriters('Bank', 'Underwriter', sDate, eDate);
    this.getTotalQuote('Bank',sDate,eDate);
    this.getAcceptedQuotes('Bank',sDate,eDate);
    this.getRejectedQuotes('Bank',sDate,eDate);
    this.getExpiredQuotes('Bank',sDate,eDate);
  }

  changeStartDate(event: MatDatepickerInputEvent<Date>) {    
    let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
    this.revDateFrom=formatedDate;
    if(this.revDateFrom!=null && this.revDateTo!=null){
        this.bankReload(this.revDateFrom,this.revDateTo);
    }   
    
  }
  changeEndDate(event:MatDatepickerInputEvent<Date>){
    let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
    this.revDateTo=formatedDate;
    if(this.revDateFrom!=null && this.revDateTo!=null){
        this.bankReload(this.revDateFrom,this.revDateTo);
    } 
  }

  changeTranStart(event:MatDatepickerInputEvent<Date>){
    let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
    this.startDate=formatedDate;
    if(this.startDate!=null && this.endDate!=null){
        this.statReload(this.startDate,this.endDate);
    }   
  }
  changeTranEnd(event:MatDatepickerInputEvent<Date>){
    let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
    this.endDate=formatedDate;
    if(this.startDate!=null && this.endDate!=null){
        this.statReload(this.startDate,this.endDate);
    }   
  }
}
