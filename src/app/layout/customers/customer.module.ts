import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerService } from './customer.service';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PaymentPlanDetailsComponent } from './payment-plan-details/payment-plan-details.component';
import { CustomerKycComponent } from './customer-kyc/customer-kyc.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';

@NgModule({
  declarations: [CustomerSearchComponent, CustomerKycComponent,CustomerListComponent, CustomerDetailsComponent, PaymentPlanDetailsComponent, CustomerKycComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [CustomerService],
  entryComponents: [CustomerKycComponent,CustomerSearchComponent, CustomerDetailsComponent, PaymentPlanDetailsComponent, CustomerKycComponent]
})
export class CustomerModule { }
