import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReferrerService } from './referrer.service';
import { ReferrerRoutingModule } from './referrer-routing.module';
import { ReferrerSearchComponent } from './referrer-search/referrer-search.component';
import { ReferrerListComponent } from './referrer-list/referrer-list.component';
import { ReferListComponent } from './refer-list/refer-list.component';
import { ReferDetailsComponent } from './refer-details/refer-details.component';
import { ReferrerKycComponent } from './referrer-kyc/referrer-kyc.component';

@NgModule({
  declarations: [ReferrerSearchComponent, ReferrerListComponent, ReferListComponent, ReferDetailsComponent, ReferrerKycComponent],
  imports: [
    CommonModule,
    ReferrerRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [ReferrerService],
  entryComponents: [ReferrerSearchComponent, ReferrerListComponent, ReferDetailsComponent, ReferrerKycComponent]
})
export class ReferrerModule { }
