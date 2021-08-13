import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FieldErrorDisplayComponent } from 'src/app/field-error-display/field-error-display.component';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { AllMastersRoutingModule } from './all-masters-routing.module';
import { EmployeeAddComponent } from './employee-master/employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-master/employee-list/employee-list.component';
import { MastersMenusComponent } from './masters-menus/masters-menus.component';
import { RoleListComponent } from './role-master/role-list/role-list.component';
import { RoleAddComponent } from './role-master/role-add/role-add.component';
import { RoleViewComponent } from './role-master/role-view/role-view.component';
import { AllMasterService } from './all-masters.service';
import { RightsListComponent } from './rights-master/rights-list/rights-list.component';
import { RightsAddComponent } from './rights-master/rights-add/rights-add.component';
import { RightsViewComponent } from './rights-master/rights-view/rights-view.component';
import { EmployeePreviewComponent } from './employee-master/employee-preview/employee-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MappingListComponent } from './roleRightsMapping-master/mapping-list/mapping-list.component';
import { MappingViewComponent } from './roleRightsMapping-master/mapping-view/mapping-view.component';
import { MappingAddComponent } from './roleRightsMapping-master/mapping-add/mapping-add.component';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { EmployeeGrantComponent } from './employee-master/employee-grant/employee-grant.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7'
@NgModule({
  declarations: [MastersMenusComponent, EmployeeListComponent, EmployeeAddComponent, EmployeePreviewComponent, FieldErrorDisplayComponent, RoleListComponent, RoleAddComponent, RoleViewComponent, RightsListComponent, RightsAddComponent, RightsViewComponent, MappingListComponent, MappingViewComponent, MappingAddComponent, EmployeeGrantComponent],
  imports: [
    CommonModule,
    AllMastersRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    DropDownListModule,
    MultiSelectModule,
    NgMultiSelectDropDownModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [AllMasterService],
  entryComponents: [EmployeeListComponent, 
    EmployeeAddComponent, 
    EmployeePreviewComponent, 
    RoleListComponent,
    RightsListComponent,
    RoleAddComponent,
    RoleViewComponent,
    RightsAddComponent,
    RightsViewComponent,
    MappingListComponent,
    MappingAddComponent
  ]
})
export class AllMastersModule { }
