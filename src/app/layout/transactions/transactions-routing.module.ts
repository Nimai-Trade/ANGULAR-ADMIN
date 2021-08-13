import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsSearchComponent } from './transactions-search/transactions-search.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionQuotesComponent } from './transaction-quotes/transaction-quotes.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'transaction',
                pathMatch: 'full'
            },
            {
                path: 'transaction',
                component: TransactionsSearchComponent
            },
            {
                path: 'transactions-list',
                component: TransactionsListComponent
            },
            {
                path: 'transactions-quotes',
                component: TransactionQuotesComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }
