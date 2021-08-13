import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignRmComponent  } from './assign-rm.component';

const routes: Routes = [
    {
        path: '',
        component: AssignRmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignRmRoutingModule { }