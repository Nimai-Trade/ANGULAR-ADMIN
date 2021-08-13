import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksSearchComponent } from './banks-search/banks-search.component';
import { BankListingComponent } from './bank-listing/bank-listing.component';
import { QuoteListingComponent } from './quote-listing/quote-listing.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'bank',
                pathMatch: 'full'
            },
            {
                path: 'bank',
                component: BanksSearchComponent
            },
            {
                path: 'bank-list',
                component: BankListingComponent
            },
            {
                path: 'quote-list',
                component: QuoteListingComponent
            },
            // {
            //     path: 'grant-kyc',
            //     component: GrantKycComponent
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BanksRoutingModule { }
