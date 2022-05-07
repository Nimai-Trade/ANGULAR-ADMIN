import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { TransactionRoutingModule } from './transactions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionService } from './transactions.service';
import { SecondaryTransactionSearchComponent } from './secondary-transaction-search/secondary-transaction-search.component';
import { SecondaryTransactionListComponent } from './secondary-transaction-list/secondary-transaction-list.component';
import { SecondaryTransactionQuotesComponent } from './secondary-transaction-quotes/secondary-transaction-quotes.component';

import { SecondaryTransactionDetailsComponent } from './secondary-transaction-details/secondary-transaction-details.component';
import { SecondaryQuotesDetailsComponent } from './secondary-quotes-details/secondary-quotes-details.component';
import { MatNativeDateModule } from '@angular/material';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [SecondaryTransactionSearchComponent, SecondaryTransactionListComponent, SecondaryTransactionDetailsComponent, 
    SecondaryTransactionQuotesComponent, SecondaryQuotesDetailsComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    MatNativeDateModule,
    DateRangePickerModule, 
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [TransactionService],
  bootstrap: [SecondaryTransactionSearchComponent],
  entryComponents: [SecondaryTransactionSearchComponent, SecondaryTransactionListComponent, SecondaryTransactionDetailsComponent,
    SecondaryQuotesDetailsComponent]
})
export class TransactionModule { }
