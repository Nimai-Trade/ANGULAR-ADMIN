import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankRmDashboardComponent } from './bank-rm-dashboard/bank-rm-dashboard.component';
import { CustRmDashboardComponent } from './cust-rm-dashboard/cust-rm-dashboard.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';
import { OpsadminDashboardComponent } from './opsadmin-dashboard/opsadmin-dashboard.component';
import { OpseditDashboardComponent } from './opsedit-dashboard/opsedit-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardMainComponent
    },
    {
        path: 'bank-rm',
        component: BankRmDashboardComponent
    },
    {
        path: 'cust-rm',
        component: CustRmDashboardComponent
    },
    {
        path: 'management',
        component: ManagementDashboardComponent
    },
    {
        path: 'ops-admin',
        component: OpsadminDashboardComponent
    },
    {
        path: 'ops-edit',
        component: OpseditDashboardComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }