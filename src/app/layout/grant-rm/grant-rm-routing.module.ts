import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrantRmComponent } from './grant-rm.component';


const routes: Routes = [
    {
        path: '',
        component: GrantRmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrantRmRoutingModule { }