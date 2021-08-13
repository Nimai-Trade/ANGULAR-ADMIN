import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'customer',
                pathMatch: 'full'
            },
            {
                path: 'customer',
                component: CustomerSearchComponent
            },
            {
                path: 'customer-list',
                component: CustomerListComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
