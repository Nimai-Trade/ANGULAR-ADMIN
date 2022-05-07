import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './main-layout/layout.component';
import { SecondaryTransactionSearchComponent } from './secondary-transaction/secondary-transaction-search/secondary-transaction-search.component';
import { SecondaryTransactionListComponent } from './secondary-transaction/secondary-transaction-list/secondary-transaction-list.component';
import { SecondaryTransactionDetailsComponent } from './secondary-transaction/secondary-transaction-details/secondary-transaction-details.component';
import { SecondaryTransactionQuotesComponent } from './secondary-transaction/secondary-transaction-quotes/secondary-transaction-quotes.component';
import { SecondaryQuotesDetailsComponent } from './secondary-transaction/secondary-quotes-details/secondary-quotes-details.component';
@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,
    ],
    declarations: [
        LayoutComponent,
        TopnavComponent,
        SidebarComponent,
        // SecondaryTransactionSearchComponent,
        // SecondaryTransactionListComponent,
        // SecondaryTransactionDetailsComponent,
        // SecondaryTransactionQuotesComponent,
        // SecondaryQuotesDetailsComponent,
        
    ],
   

})
export class LayoutModule { }
