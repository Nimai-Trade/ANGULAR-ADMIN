import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { StatModule } from '../../shared/modules/stat.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GrantRmService } from './grant-rm.service';
import { GrantRmComponent } from './grant-rm.component';
import { GrantRmRoutingModule } from './grant-rm-routing.module';


@NgModule({
    imports: [
        CommonModule,
        GrantRmRoutingModule,
        NgxFileDropModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StatModule,
        SharedModule,
        MatListModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ], providers: [GrantRmService],
    declarations: [GrantRmComponent],
    entryComponents: []
})
export class GrantRmModule { }
