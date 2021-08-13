import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportRoutingModule } from './refund-credit-routing.module';
import { RefundCreditService } from './refund-credit.service';
import { RefundCreditComponent } from './refund-credit/refund-credit.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [RefundCreditComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    DateRangePickerModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [RefundCreditService],
  entryComponents: []
})
export class ReportModule { }
