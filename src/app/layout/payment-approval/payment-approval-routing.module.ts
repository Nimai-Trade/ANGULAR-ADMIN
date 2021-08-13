import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentApprovalComponent } from './payment-approval/payment-approval.component';



const routes: Routes = [
    {
        path: '',
        component: PaymentApprovalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentApprovalRoutingModule { }