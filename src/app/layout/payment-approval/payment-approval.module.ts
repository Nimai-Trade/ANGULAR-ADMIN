import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { StatModule } from '../../shared/modules/stat.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentApprovalService } from './payment-approval.service';
import { PaymentApprovalComponent } from './payment-approval/payment-approval.component';
import { PaymentApprovalRoutingModule } from './payment-approval-routing.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
    imports: [
        CommonModule,
        PaymentApprovalRoutingModule,
        NgxFileDropModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StatModule,
        SharedModule,
        MatListModule,
        DropDownListModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ], providers: [PaymentApprovalService],
    declarations: [PaymentApprovalComponent],
    entryComponents: [PaymentApprovalComponent]
})
export class PaymentApprovalModule { }
