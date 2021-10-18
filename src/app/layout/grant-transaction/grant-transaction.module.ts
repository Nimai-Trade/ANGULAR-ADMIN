import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { StatModule } from '../../shared/modules/stat.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GrantTransactionService } from './grant-transaction.service';
import { GrantTransactionComponent } from './grant-transaction/grant-transaction.component';
import { GrantTransactionRoutingModule } from './grant-transaction-routing.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
    imports: [
        CommonModule,
        GrantTransactionRoutingModule,
        NgxFileDropModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StatModule,
        SharedModule,
        MatListModule,
        DropDownListModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ], providers: [GrantTransactionService],
    declarations: [GrantTransactionComponent],
    entryComponents: [GrantTransactionComponent]
})
export class GrantTransactionModule { }
