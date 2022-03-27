import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/directive/format-datepicker';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { DashboardService } from '../dashboard.service';
declare let google: any;
import * as $ from 'src/assets/js/jquery.min';



@Component({
  selector: 'app-opsadmin-dashboard',
  templateUrl: './opsadmin-dashboard.component.html',
  styleUrls: ['./opsadmin-dashboard.component.scss']
})
export class OpsadminDashboardComponent implements OnInit {
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];  
  public modeselect = 'Customer';
  now = new Date().getUTCFullYear();
  currDate:any=formatDate(new Date(), 'yyyy-MM-dd', 'en');
  befDate:any=formatDate(new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() - 30) ,'yyyy-MM-dd', 'en');
  years = Array(this.now - (this.now - 5)).fill('').map((v, idx) => this.now - idx);
  dateFrom: any;
  userStat: any[];
  dashForm: FormGroup = new FormGroup({});
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
    dataSource = new MatTableDataSource<Element[]>();
    @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
    displayColumns: string[] = ['countryName', 'totalCustomers', 'totalUnderwriters', 'totalTrxn', 'cumulativeLcValue'];

    subsType: string[] = ['All', 'Customer', 'Bank As Customer', 'Bank as UnderWriter','Refferer']
  isAll: boolean=false;
  userStatType: string[] = ['Customer', 'Bank As Customer', 'Bank As UnderWriter']
  dashboardData: any;
  bankBarChart: any;
  bankdashbrdcount: any;
  banklatestaccepttrxn: any;
  newUserDate: any;
  newUserBank: any;
  activeUserDate: any;
  activeUserBank: any;
  revDateFrom:any;
  revDateTo:any;
  public startDate:any;
  endDate:any;
  countryList: any[];
  disCoupGrantCount: number;
  overAllCustCount: number;
  overAllRefCount: number;
  bankAsCustCount: number;
  bankAsUwCount: number;
  overAllCustRejTransc: number;
  overAllCustExpiredTransc: number;
  subsGrantCount: any;
  vasGrantCount: any;


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
    this.subscriberType="All"
    this.getPendingRequests();


    this.getSubscripGrant();
     this.getVasGrant();
     this.getDiscountGrant();
     this.getOverAllCust();
     this.getOverAllBnkAsUw();
     this.getOverAllBnkAsCust();
     this.getOverAllRef();
     this.getOverAllCustRejectedTran();
     this.getOverAllCustExpiredTran();
     this.getCountryList();
    // this.getCustRevenue(null, null);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getCountryList();
    this.getNewUserStats(null, null);
    this.getActiveUsers(null, null);
    this.getAllTransationStat(null, null);
    this.cdr.detectChanges();
    this.getAverageQuotes(null, null);
}


getSubscripGrant() {
  this.service.getSubscriptionGrant().subscribe((res) => {
      this.subsGrantCount = res;
  })
}
getVasGrant() {
  this.service.getVasGrantCount().subscribe((res) => {
      this.vasGrantCount = res;
  })
}
getDiscountGrant() {
  this.service.getGrantCouponsCount().subscribe((res) => {
      this.disCoupGrantCount = res;
  })
}
getOverAllCust() {
  this.service.getOverAllCust("Customer").subscribe((res) => {
      this.overAllCustCount = res;
  })
}
getOverAllBnkAsUw() {
  this.service.getOverAllBank("Bank", "Underwriter").subscribe((res) => {
      this.bankAsUwCount = res;
  })
}
getOverAllBnkAsCust() {
  this.service.getOverAllBank("Bank", "Customer").subscribe((res) => {
      this.bankAsCustCount = res;
  })
}
getOverAllRef() {
  console.log('refffffff')
  this.service.getOverallReferrer("Referrer").subscribe((res) => {
    console.log(res)

      this.overAllRefCount = res;
  })
}
getOverAllCustRejectedTran() {
  this.service.getCustomerTranStatCount("Rejected").subscribe((res) => {
      this.overAllCustRejTransc = res;
  })
}
getOverAllCustExpiredTran() {
  this.service.getCustomerTranStatCount("Expired").subscribe((res) => {
      this.overAllCustExpiredTransc = res;
  })
}


getCountryList() {      
  this.service.getCountryDetails().subscribe((res) => this.onSuccess(res));
}


onSuccess(res) {
  if (res !== undefined) {
      this.countryList = [];
      res.forEach(item => {
          this.countryList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.countryList);
      this.dataSource.paginator = this.paginator;
  }
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
      this.paymentApprovalCount=res.paymentApproval
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


if(status=="payment-approval"){
  if(this.paymentApprovalCount ==0 || !this.isAll)  
  return
  if(this.bankType == "Underwriter"){
    if(this.bankType == 'Underwriter' )
    localStorage.setItem('fromDashBoardStatus', 'BANK UNDERWRITER');
localStorage.setItem('PaymentApproval', 'PaymentPending');
localStorage.setItem('fromDashBoard', 'yes');
localStorage.setItem('bankSearch', JSON.stringify(data));
this.router.navigate(['app', 'bank', 'bank-list']);
}
if(this.bankType == "" || this.bankType == 'Customer' ){
  if(this.bankType == "" )
  localStorage.setItem('fromDashBoardStatus', 'CUSTOMER');
  if( this.bankType == 'Customer')
  localStorage.setItem('fromDashBoardStatus', 'BANK CUSTOMER');
    localStorage.setItem('PaymentApproval', 'PaymentPending');
    localStorage.setItem('fromDashBoard', 'yes');
    localStorage.setItem('customerSearch', JSON.stringify(data));
    this.router.navigate(['app', 'customer', 'customer-list']);
}
}


    if(status=='kyc'){
      if(this.pendingKycApprovalCount ==0 || !this.isAll)  
      return
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
      if(this.bankType == "" )
      localStorage.setItem('fromDashBoardStatus', 'CUSTOMER');
      if( this.bankType == 'Customer')
      localStorage.setItem('fromDashBoardStatus', 'BANK CUSTOMER');      
      if(this.bankType == "Underwriter" )
      localStorage.setItem('fromDashBoardStatus', 'BANK UNDERWRITER');
      if(this.bankType=="Referrer")
      localStorage.setItem('fromDashBoardStatus', 'REFERRER');
   } 
 
 if(status=='employeeGrant'){
  if(this.grantUserCount ==0 || !this.isAll)  
  return
  localStorage.setItem('fromDashBoard', 'yes');

  this.router.navigate(['app', 'masters', 'employeeGrant']);
}
if(status=='grant'){
  if(this.grantKycCount ==0 || !this.isAll)  
  return
  if(this.bankType == "" )
  localStorage.setItem('fromDashBoardStatus', 'CUSTOMER');
  if( this.bankType == 'Customer')
  localStorage.setItem('fromDashBoardStatus', 'BANK CUSTOMER');      
  if(this.bankType == "Underwriter" )
  localStorage.setItem('fromDashBoardStatus', 'BANK UNDERWRITER');
  if(this.bankType=="Referrer")
  localStorage.setItem('fromDashBoardStatus', 'REFERRER');
  this.router.navigate(['app', 'grantkyc']);
}
if(status=='grant-payment'){
  this.router.navigate(['app', 'payment-approval']);
}
if(status=='assign-rm'){
  if(this.assignRmCOunt ==0 || !this.isAll)  
  return
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
  if(this.grantRmPending ==0 || !this.isAll)  
  return
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




subsRouteMethod(event) {
  if (this.newUserDate == undefined) {
      this.newUserDate = null;
  }
  if (event != null && event.value == 'Bank As Customer') {
      this.newUserBank = 'Customer';
  } else if (event != null && event.value == 'Bank As UnderWriter') {
      this.newUserBank = 'Underwriter';
  } else if (event != null && event.value == 'Customer') {
      this.newUserBank = null;
  }

  this.getNewUserStats(this.newUserDate, this.newUserBank);
}

yearRouteMethod(event) {
  this.newUserDate = event.value;

  if (this.newUserBank == undefined) {
      this.newUserBank = null;
  }
  this.getNewUserStats(this.newUserDate, this.newUserBank);
}
getNewUserStats(dateFrom, bankType) {

  this.service.getNewUserStatsCount(dateFrom, bankType).subscribe((response) => {

      this.dashboardData = JSON.parse(JSON.stringify(response))
      var header_country = ['month', 'Customers', 'Subscription Rate'];
      var data_country = [];
      data_country.push(header_country);
      for (var i = 0; i < this.dashboardData.length; i++) {
          var temp = [];
          temp.push(this.dashboardData[i].month);
          temp.push(Number(this.dashboardData[i].customers));
          temp.push(Number(this.dashboardData[i].subs_rate));
          data_country.push(temp);
      }
      google.charts.load('current', { 'packages': ['corechart', 'bar'] });
      google.charts.setOnLoadCallback(() => this.drawBarChartCountry(data_country));
  }, (error) => {

  }
  );
}
drawBarChartCountry(data_country) {
  var data = google.visualization.arrayToDataTable(data_country);
  // Set chart options
  var options = {
      title: '',
      vAxes: {
          "0": {
              title: "count"
          },
      },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      //series: {1: {type: 'line'}},
      series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 1, type: 'line' }
      }
  };

  var chart = new google.visualization.ComboChart(document.getElementById('bar_chart_country'));
  google.visualization.events.addListener(chart, 'error', function (googleError) {
    google.visualization.errors.removeError(googleError.id);
});
if(data.getNumberOfRows() == 0){
    $('#bar_chart_country').html("<div style='padding-left: 46%;padding-top: 10%;'><b>No data found</b></div>")
}else{
    chart.draw(data, options);
}
}
activeUserRouteMethod(event) {
  if (this.activeUserDate == undefined) {
      this.activeUserDate = null;
  }
  if (event != null && event.value == 'Bank As Customer') {
      this.activeUserBank = 'Customer';
  } else if (event != null && event.value == 'Bank As UnderWriter') {
      this.activeUserBank = 'Underwriter';
  } else if (event != null && event.value == 'Customer') {
      this.activeUserBank = null;
  }

  this.getActiveUsers(this.activeUserDate, this.activeUserBank);
}
activeUserYearRoute(event) {
  this.activeUserDate = event.value;

  if (this.activeUserBank == undefined) {
      this.activeUserBank = null;
  }
  this.getActiveUsers(this.activeUserDate, this.activeUserBank);
}
getActiveUsers(dte, bankType) {

  return this.service.getActiveUserStats(dte, bankType).subscribe((res) => {
      this.dashboardData = JSON.parse(JSON.stringify(res))
      var header_country = ['month', 'Customers'];
      var data_country = [];
      data_country.push(header_country);
      for (var i = 0; i < this.dashboardData.length; i++) {
          var temp = [];
          temp.push(this.dashboardData[i].month);
          temp.push(Number(this.dashboardData[i].customers));
          data_country.push(temp);
      }
      google.charts.load('current', { 'packages': ['bar'] });
      google.charts.setOnLoadCallback(() => this.drawActiveUserBarChart(data_country));
  }, (error) => {

  }
  );
}
drawActiveUserBarChart(data_country) {
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

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div1'));
  google.visualization.events.addListener(chart, 'error', function (googleError) {
  google.visualization.errors.removeError(googleError.id);
});
if(data.getNumberOfRows() == 0){
    $('#chart_div1').html("<div style='padding-left: 46%;padding-top: 10%;'><b>No data found</b></div>")
}else{
    chart.draw(data, options);
}
  
}


getAllTransationStat(dateFrom, dateTo) {
  this.service.getTransactionalStat(null, null, dateFrom, dateTo).subscribe((res) => {

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

  var chart = new google.visualization.ComboChart(document.getElementById('transaction_chart'));
  google.visualization.events.addListener(chart, 'error', function (googleError) {
    google.visualization.errors.removeError(googleError.id);
});
  chart.draw(data, options);
}

getAverageQuotes(dateFrom, dateTo) {
  this.service.getAvgQuotesPerTrans(dateFrom, dateTo).subscribe((res) => {
      this.dashboardData = JSON.parse(JSON.stringify(res))
      var header_country = ['month', 'Volume'];
      var data_country = [];
      data_country.push(header_country);
      for (var i = 0; i < this.dashboardData.length; i++) {
          var temp = [];
          temp.push(this.dashboardData[i].month + "-" + Number(this.dashboardData[i].day));
          temp.push(Number(this.dashboardData[i].total_quotes)/Number(this.dashboardData[i].transaction_count));
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

reloadRevenue(){
//this.getCustRevenue(this.revDateFrom, this.revDateTo);
}

reloadStat(startDate,endDte){

this.getAllTransationStat(startDate, endDte);

this.getAverageQuotes(startDate, endDte);
}
changeStartDate(event: MatDatepickerInputEvent<Date>) {    
let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
this.revDateFrom=formatedDate;
if(this.revDateFrom!=null && this.revDateTo!=null){
    //this.getCustRevenue(this.revDateFrom,this.revDateTo);
}   

}
changeEndDate(event:MatDatepickerInputEvent<Date>){
let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
this.revDateTo=formatedDate;
if(this.revDateFrom!=null && this.revDateTo!=null){
  //  this.getCustRevenue(this.revDateFrom,this.revDateTo);
} 
}

changeTranStart(event:MatDatepickerInputEvent<Date>){
let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
this.startDate=formatedDate;
if(this.startDate!=null && this.endDate!=null){
    this.reloadStat(this.startDate,this.endDate);
}   
}
changeTranEnd(event:MatDatepickerInputEvent<Date>){
let formatedDate  = formatDate(new Date(event.target.value), 'yyyy-MM-dd', 'en'); 
this.endDate=formatedDate;
if(this.startDate!=null && this.endDate!=null){
    this.reloadStat(this.startDate,this.endDate);
}   
}


}
