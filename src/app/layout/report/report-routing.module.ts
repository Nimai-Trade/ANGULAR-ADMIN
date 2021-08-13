import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'report',
                pathMatch: 'full'
            },
            {
                path: 'report',
                component: ReportComponent
            }          


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
