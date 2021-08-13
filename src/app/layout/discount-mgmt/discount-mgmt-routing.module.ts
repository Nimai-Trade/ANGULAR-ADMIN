import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcouponComponent } from './listcoupon/listcoupon.component';
import {DiscountMgmtActionComponent} from './discount-mgmt-action/discount-mgmt-action.component'
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'discount-mgmt',
                pathMatch: 'full'
            },
            {
                path: 'discount',
                component: ListcouponComponent
            },
            {
                path: 'discount-mgmt-action',
                component: DiscountMgmtActionComponent
            },

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiscountMgmtRoutingModule { }