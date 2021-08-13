import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { VasPlanListComponent } from './vas-plan-list/vas-plan-list.component';
import { VasPlanActionComponent } from './vas-plan-action/vas-plan-action.component';
import { SubscriptionActionComponent } from './subscription-action/subscription-action.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'plan',
                pathMatch: 'full'
            },
            {
                path: 'plan',
                component: SubscriptionListComponent
            },
            {
                path: 'vas',
                component: VasPlanListComponent
            },
            {
                path: 'vas-action',
                component: VasPlanActionComponent
            },
            {
                path: 'plan-action',
                component: SubscriptionActionComponent
            }



        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
