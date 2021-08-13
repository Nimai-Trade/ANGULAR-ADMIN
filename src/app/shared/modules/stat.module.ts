import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat-box/stat.component';
import { MatCardModule } from '@angular/material';
import { MatGridListModule, MatIconModule } from '@angular/material';
import { StockComponent } from './stock/stock.component';
import { MaterialModule } from '../material-module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule, MaterialModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ],
    declarations: [StatComponent, StockComponent],
    entryComponents: [StockComponent],
    exports: [StatComponent]
})
export class StatModule { }
