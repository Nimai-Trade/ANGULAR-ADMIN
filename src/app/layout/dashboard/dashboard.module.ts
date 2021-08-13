import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatPaginatorModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { StatModule } from '../../shared/modules/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';
import { CustRmDashboardComponent } from './cust-rm-dashboard/cust-rm-dashboard.component';
import { BankRmDashboardComponent } from './bank-rm-dashboard/bank-rm-dashboard.component';
import { OpsadminDashboardComponent } from './opsadmin-dashboard/opsadmin-dashboard.component';
import { OpseditDashboardComponent } from './opsedit-dashboard/opsedit-dashboard.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        DateRangePickerModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ],
    declarations: [DashboardComponent, ManagementDashboardComponent, CustRmDashboardComponent, BankRmDashboardComponent, OpsadminDashboardComponent, OpseditDashboardComponent, DashboardMainComponent]
})
export class DashboardModule { }
