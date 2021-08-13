import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrantKycComponent } from './grant-kyc.component';

const routes: Routes = [
    {
        path: '',
        component: GrantKycComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrantkycRoutingModule { }
