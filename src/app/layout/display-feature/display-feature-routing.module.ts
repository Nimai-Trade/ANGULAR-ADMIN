import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayFeatureDataComponent } from './display-feature-data/display-feature-data.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'display-feature',
                pathMatch: 'full'
            },
            {
                path: 'display-feature',
                component: DisplayFeatureDataComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DisplayFeatureRoutingModule { }
