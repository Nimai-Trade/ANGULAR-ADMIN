import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefundCreditComponent } from './refund-credit/refund-credit.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'refund_credit',
                pathMatch: 'full'
            },
            {
                path: 'refund_credit',
                component: RefundCreditComponent
            }          


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
