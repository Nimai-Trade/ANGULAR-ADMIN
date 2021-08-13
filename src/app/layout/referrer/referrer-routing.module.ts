import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferrerSearchComponent } from './referrer-search/referrer-search.component';
import { ReferrerListComponent } from './referrer-list/referrer-list.component';
import { ReferListComponent } from './refer-list/refer-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'referrer',
                pathMatch: 'full'
            },
            {
                path: 'referrer',
                component: ReferrerSearchComponent
            },
            {
                path: 'referrer-list',
                component: ReferrerListComponent
            },
            {
                path: 'refer-list',
                component: ReferListComponent
            }


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReferrerRoutingModule { }
