import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrantTransactionComponent } from './grant-transaction/grant-transaction.component';



const routes: Routes = [
    {
        path: '',
        component: GrantTransactionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrantTransactionRoutingModule { }