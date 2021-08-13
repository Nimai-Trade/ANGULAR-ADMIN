import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GrantKycComponent } from './grant-kyc.component';
import { GrantkycRoutingModule } from './grantkyc-routing.module';
import { GrantkycService } from './grantkyc.service';


@NgModule({
  declarations: [GrantKycComponent],
  imports: [
    CommonModule,
    GrantkycRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [GrantkycService],
  entryComponents: [GrantKycComponent]
})
export class GrantkycModule { }
