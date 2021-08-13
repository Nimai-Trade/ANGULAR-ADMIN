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
import { TransactionsSearchComponent } from './transactions-search/transactions-search.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionQuotesComponent } from './transaction-quotes/transaction-quotes.component';
import { QuotesDetailsComponent } from './quotes-details/quotes-details.component';
import { MatNativeDateModule } from '@angular/material';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [TransactionsSearchComponent, TransactionsListComponent, TransactionDetailsComponent, TransactionQuotesComponent, QuotesDetailsComponent],
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
  bootstrap: [TransactionsSearchComponent],
  entryComponents: [TransactionsSearchComponent, TransactionsListComponent, TransactionDetailsComponent, QuotesDetailsComponent]
})
export class TransactionModule { }
