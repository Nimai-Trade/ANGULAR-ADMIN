import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { AppDateAdapter } from 'src/app/shared/directive/format-datepicker';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MatDialogRef, MAT_DIALOG_DATA, MatTableModule,MatPaginator, MatSort} from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ChangeDetectorRef } from '@angular/core';

declare let google: any;


export const APP_DATE_FORMATS = {
    parse: { dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' } },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric' }
    }
};
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})

export class DashboardComponent implements OnInit {
    public pagerConfig: any;
    public pageSizeOptions = [5, 10, 20, 30];
    @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
    @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort; 
    now = new Date().getUTCFullYear();
    years = Array(this.now - (this.now - 10)).fill('').map((v, idx) => this.now - idx);
    dateFrom: any;
    userStat: any[];
    dashForm: FormGroup = new FormGroup({});
    dataSource = new MatTableDataSource<Element[]>();
    displayColumns: string[] = ['countryName', 'totalCustomers', 'totalUnderwriters', 'totalTrxn', 'cumulativeLcValue'];
    minDate: any;
    maxDate: any;
    dateValue: any;
    subscriberType: string;
    bankType: string;
    countryList: any = [];
    payAwaitedCount: any;
    paymentApprovalCount: number;
    assignRmCOunt: number;
    grantRmPending: number;
    grantUserCount: number;
    pendingKycApprovalCount: number;
    grantKycCount: number;
    pendingKyc: number;

    custRevenue: any;
    cusSubs: number;
    cusAmount: number;
    bankCustRevenue: any;
    bcSubs: number;
    bcAmount: number;
    uwRevenue: any;
    uwSubs: number;
    uwAmount: number;

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

    subsType: string[] = ['All', 'Customer', 'Bank As Customer', 'Bank as UnderWriter', 'Referrer']


    userStatType: string[] = ['Customer', 'Bank As Customer', 'Bank As UnderWriter']
    dashboardData: any;
    bankBarChart: any;
    bankdashbrdcount: any;
    banklatestaccepttrxn: any;
    newUserDate: any;
    newUserBank: any;
    activeUserDate: any;
    activeUserBank: any;



    constructor(private formBuilder: FormBuilder, private service: DashboardService, public dialog: MatDialog, private cdr: ChangeDetectorRef, public sharedUtilService: SharedUtilService) {
        {

        }


    } 
    ngOnInit(): void {    
        this.cdr.detectChanges();
        this.getPaymentConf();
        this.getPaymentApp();
        this.getAssignRmCount();
        this.getGrantRm();
        this.getGrantUSer();
        this.getKycApprovalPending();
        this.getGrantKyc();
        this.getPendingKyc();
        this.getSubscripGrant();
        this.getVasGrant();
        this.getDiscountGrant();
        this.getOverAllCust();
        this.getOverAllBnkAsUw();
        this.getOverAllBnkAsCust();
        this.getOverAllRef();
        this.getSubsExpiry();
        this.getOverAllCustRejectedTran();
        this.getOverAllCustExpiredTran();
        this.getCountryList();
        this.getPaymentPending();
        this.getCustRevenue(null, null);

    }
    ngAfterViewInit() {
       //this.getCountryList();
       this.dataSource.paginator = this.paginator;
        this.getNewUserStats(null, null);
        this.getActiveUsers(null, null);
        this.getAllTransationStat(null, null);
        this.cdr.detectChanges();
        this.getAverageQuotes(null, null);
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
    getSubsExpiry() {

        this.service.getSubsExpiryCount("All", "").subscribe((res) => {
            this.subsExpiryCount = res;
        })
    }
    getPaymentPending() {
        this.service.getPayPendingCount("All", "").subscribe((res) => {
            this.paymenPending = res;
        })
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
        this.service.getOverAllCust("Referrer").subscribe((res) => {
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
            });
            this.dataSource = new MatTableDataSource(this.countryList);
            this.dataSource.paginator = this.paginator;
        }
    }


    subsCount(subs) {
        console.log(subs.value);

        if (subs.value === "Bank As Customer") {
            this.subscriberType = "Bank";
            this.bankType = "Customer";
        } else if (subs.value === "Bank as UnderWriter") {
            this.subscriberType = "Bank";
            this.bankType = "Underwriter";
        } else {
            this.subscriberType = subs.value;
            this.bankType = "";
        }
        this.service.getSubsExpiryCount(this.subscriberType, this.bankType).subscribe((res) => {
            this.subsExpiryCount = res;
        })
    }
    payPendingCount(subs) {
        console.log(subs.value);

        if (subs.value === "Bank As Customer") {
            this.subscriberType = "Bank";
            this.bankType = "Customer";
        } else if (subs.value === "Bank as UnderWriter") {
            this.subscriberType = "Bank";
            this.bankType = "Underwriter";
        } else {
            this.subscriberType = subs.value;
            this.bankType = "";
        }
        this.service.getPayPendingCount(this.subscriberType, this.bankType).subscribe((res) => {
            this.paymenPending = res;
        })
    }

    pendingKycCount(subs) {
        console.log(subs.value);

        if (subs.value == "Bank As Customer") {
            this.subscriberType = "Bank";
            this.bankType = "Customer";
            console.log(this.bankType);
        } else if (subs.value == "Bank as UnderWriter") {
            this.subscriberType = "Bank";
            this.bankType = "Underwriter";
        } else if (subs.value == "Referrer") {
            this.subscriberType = "Bank";
            this.bankType = null;
        }
        else {
            this.subscriberType = subs.value;
            this.bankType = null;
        }
        this.service.getPendingKycCount(this.subscriberType, this.bankType).subscribe((res) => {
            this.pendingKycDrop = res;
        })

    }
    getCustRevenue(dateFrom, dateTo) {
        this.service.getCustRevenue(dateFrom, dateTo).subscribe((res) => {

            this.custRevenue = JSON.parse(JSON.stringify(res));
            for (let key of Object.keys(this.custRevenue)) {
                this.cusAmount = Number(this.custRevenue['amount']);
                this.cusSubs = Number(this.custRevenue['subscription_count']);

            }
        });
        this.service.getBankAsCustomerRevenue(dateFrom, dateTo).subscribe((res) => {
            this.bankCustRevenue = JSON.parse(JSON.stringify(res));
            for (let key of Object.keys(this.bankCustRevenue)) {
                this.bcAmount = Number(this.bankCustRevenue['amount']);
                this.bcSubs = Number(this.bankCustRevenue['subscription_count']);

            }
        });
        this.service.getBankUwRevenue(dateFrom, dateTo).subscribe((res) => {
            this.uwRevenue = JSON.parse(JSON.stringify(res));
            for (let key of Object.keys(this.uwRevenue)) {
                this.uwAmount = Number(this.uwRevenue['amount']);
                this.uwSubs = Number(this.uwRevenue['subscription_count']);

            }
        });

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
        console.log("data country --", data_country)
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
                0: { targetAxisIndex: 0 },
                1: { targetAxisIndex: 1, type: 'line' }
            }
        };

        var chart = new google.visualization.ComboChart(document.getElementById('bar_chart_country'));
        chart.draw(data, options);
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
        chart.draw(data, options);
    }


    getAllTransationStat(dateFrom, dateTo) {
        this.service.getTransactionalStat(null, null, dateFrom, dateTo).subscribe((res) => {

            this.dashboardData = JSON.parse(JSON.stringify(res))
            var header_country = ['month', 'Transactions', 'Cumulative Amount'];
            var data_country = [];
            data_country.push(header_country);
            for (var i = 0; i < this.dashboardData.length; i++) {
                var temp = [];
                temp.push(this.dashboardData[i].month + "-" + Number(this.dashboardData[i].day));
                temp.push(Number(this.dashboardData[i].trxn_count));
                temp.push(Number(this.dashboardData[i].cumulative_amount));
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
                    title: "count"
                },
                "1": {
                    title: "amount"
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
                temp.push(Number(this.dashboardData[i].total_quotes));
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
        chart.draw(data, options);
    }

}