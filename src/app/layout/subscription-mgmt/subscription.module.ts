import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { StatModule } from 'src/app/shared/modules/stat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { VasPlanListComponent } from './vas-plan-list/vas-plan-list.component';
import { VasPlanAddComponent } from './vas-plan-add/vas-plan-add.component';
import { VasPlanActionComponent } from './vas-plan-action/vas-plan-action.component';
import { VasPlanViewComponent } from './vas-plan-view/vas-plan-view.component';
import { SubscriptionViewComponent } from './subscription-view/subscription-view.component';
import { SubscriptionAddComponent } from './subscription-add/subscription-add.component';
import { SubscriptionActionComponent } from './subscription-action/subscription-action.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [SubscriptionListComponent, VasPlanListComponent, VasPlanAddComponent, VasPlanActionComponent, VasPlanViewComponent, SubscriptionViewComponent, SubscriptionAddComponent, SubscriptionActionComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    NgxFileDropModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatModule,
    SharedModule,
    DropDownListModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [SubscriptionService],
  entryComponents: [VasPlanAddComponent, VasPlanViewComponent, SubscriptionViewComponent, SubscriptionAddComponent]
})
export class SubscriptionModule { }
