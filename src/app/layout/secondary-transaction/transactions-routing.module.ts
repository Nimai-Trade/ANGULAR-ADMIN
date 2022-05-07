import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondaryTransactionSearchComponent } from './secondary-transaction-search/secondary-transaction-search.component';
import { SecondaryTransactionListComponent } from './secondary-transaction-list/secondary-transaction-list.component';
import { SecondaryTransactionQuotesComponent } from './secondary-transaction-quotes/secondary-transaction-quotes.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'secondary-transaction',
                pathMatch: 'full'
            },
            {
                path: 'secondary-transaction-search',
                component: SecondaryTransactionSearchComponent
            },
            {
                path: 'secondary-transactions-list',
                component: SecondaryTransactionListComponent
            },
            {
                path: 'secondary-transactions-quotes',
                component: SecondaryTransactionQuotesComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }
