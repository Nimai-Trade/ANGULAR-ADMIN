import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { StatModule } from '../../shared/modules/stat.module';
import { AssignRmRoutingModule } from './assign-rm-routing.module';
import { AssignRmComponent } from './assign-rm.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignRmService } from './assign-rm.service';

@NgModule({
    imports: [
        CommonModule,
        AssignRmRoutingModule,
        NgxFileDropModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StatModule,
        SharedModule,
        MatListModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ], providers: [AssignRmService],
    declarations: [AssignRmComponent],
    entryComponents: []
})
export class AssignRmModule { }
