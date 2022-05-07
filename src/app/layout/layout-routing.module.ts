import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './main-layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'masters',
                loadChildren: './all-masters/all-masters.module#AllMastersModule'
            },
            {
                path: 'assignRm',
                loadChildren: './assign-rm/assign-rm.module#AssignRmModule'
            },
            {
                path: 'discount-mgmt',
                loadChildren: './discount-mgmt/discount-mgmt.module#DiscountMgmtModule'
            },
            {
                path: 'transactions',
                loadChildren: './transactions/transaction.module#TransactionModule'
            },
            {
                path: 'secondary-transaction',
                loadChildren: './secondary-transaction/transaction.module#TransactionModule'
            },
            {
                path: 'customer',
                loadChildren: './customers/customer.module#CustomerModule'
            },
            {
                path: 'bank',
                loadChildren: './banks/banks.module#BanksModule'
            },
            {
                path: 'subscription',
                loadChildren: './subscription-mgmt/subscription.module#SubscriptionModule'
            }, 
            {
                path: 'referrer',
                loadChildren: './referrer/referrer.module#ReferrerModule'
            },
            {
                path: 'display-feature',
                loadChildren: './display-feature/display-feature.module#DisplayFeatureModule'
            },
            {
                path: 'report',
                loadChildren: './report/report.module#ReportModule'
            },
            {
                path: 'refund_credit',
                loadChildren: './refund-credit/refund-credit.module#ReportModule'
            },
            {
                path: 'grantkyc',
                loadChildren: './grant-kyc/grantkyc.module#GrantkycModule'
            },
            {
                path: 'grant-rm',
                loadChildren: './grant-rm/grant-rm.module#GrantRmModule'
            },
            {
                path: 'payment-approval',
                loadChildren: './payment-approval/payment-approval.module#PaymentApprovalModule'
            },
            {
                path: 'grant-transaction',
                loadChildren: './grant-transaction/grant-transaction.module#GrantTransactionModule'
            },
            {
                path:'change-password',
                loadChildren: './change-password/change-password.module#ChangePasswordModule'
            }


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
