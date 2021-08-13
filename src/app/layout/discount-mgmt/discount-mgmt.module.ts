import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FieldErrorDisplayComponent } from 'src/app/field-error-display/field-error-display.component';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscountMgmtRoutingModule } from './discount-mgmt-routing.module';
import { AddcouponComponent } from './addcoupon/addcoupon.component';
import { ListcouponComponent } from './listcoupon/listcoupon.component';
import { DiscountMgmtService } from './discount-mgmt.service';
import { DiscountMgmtActionComponent } from './discount-mgmt-action/discount-mgmt-action.component';
import { PreviewcouponComponent } from './previewcoupon/previewcoupon.component'
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  imports: [
    CommonModule,
    DiscountMgmtRoutingModule,
    MaterialModule,
    CommonModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    DropDownListModule,
    TimePickerModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [DiscountMgmtService],
  entryComponents: [AddcouponComponent,     
    ListcouponComponent,
    PreviewcouponComponent,
    DiscountMgmtActionComponent
  ],
  declarations: [AddcouponComponent, ListcouponComponent, DiscountMgmtActionComponent, PreviewcouponComponent]
})
export class DiscountMgmtModule { }
