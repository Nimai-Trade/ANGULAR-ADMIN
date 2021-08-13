import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-master/employee-list/employee-list.component';
import { MastersMenusComponent } from './masters-menus/masters-menus.component';
import { RoleListComponent } from './role-master/role-list/role-list.component';
import { RightsListComponent } from './rights-master/rights-list/rights-list.component';
import { MappingListComponent } from './roleRightsMapping-master/mapping-list/mapping-list.component';
import { EmployeeGrantComponent } from './employee-master/employee-grant/employee-grant.component';

const routes: Routes = [
    {
        path: '',
        // component: MastersMenusComponent,
        children: [
            {
                path: '',
                redirectTo: 'employee',
                pathMatch: 'full'
            },
            {
                path: 'employee',
                component: EmployeeListComponent
            },
            {
                path: 'role',
                component: RoleListComponent
            },
            {
                path: 'rights',
                component: RightsListComponent
            },
            {
                path: 'roleRightsMapping',
                component: MappingListComponent
            },
            {
                path: 'employeeGrant',
                component: EmployeeGrantComponent
            }
            

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllMastersRoutingModule { }
