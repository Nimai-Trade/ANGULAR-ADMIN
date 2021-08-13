import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayFeatureRoutingModule } from './display-feature-routing.module';
import { DisplayFeatureService } from './display-feature.service';
import { DisplayFeatureDataComponent } from './display-feature-data/display-feature-data.component';

@NgModule({
  declarations: [DisplayFeatureDataComponent],
  imports: [
    CommonModule,
    DisplayFeatureRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [DisplayFeatureService],
  entryComponents: []
})
export class DisplayFeatureModule { }
