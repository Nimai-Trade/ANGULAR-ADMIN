import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BanksRoutingModule } from './banks-routing.module';
import { BanksSearchComponent } from './banks-search/banks-search.component';
import { BanksService } from './banks.service';
import { BankListingComponent } from './bank-listing/bank-listing.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BankPlanPaymentComponent } from './bank-plan-payment/bank-plan-payment.component';
import { BankKycComponent } from './bank-kyc/bank-kyc.component';
import { QuoteListingComponent } from './quote-listing/quote-listing.component';
import { BankQuoteDetailComponent } from './bank-quote-detail/bank-quote-detail.component';
import { BankTrxnDetailsComponent } from './bank-trxn-details/bank-trxn-details.component';





@NgModule({
  declarations: [BanksSearchComponent, BankListingComponent, BankDetailsComponent, BankPlanPaymentComponent, BankKycComponent, QuoteListingComponent, BankQuoteDetailComponent, BankTrxnDetailsComponent],
  imports: [
    CommonModule,
    BanksRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [BanksService],
  entryComponents: [BanksSearchComponent, BankDetailsComponent, BankPlanPaymentComponent, BankKycComponent, BankQuoteDetailComponent, BankTrxnDetailsComponent]
})
export class BanksModule { }
