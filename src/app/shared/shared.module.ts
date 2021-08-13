import { NgModule } from '@angular/core';
import { alphaDirective } from './directive/alpha.directive';
import { alphaNumericDirective } from './directive/alphaNumeric.directive';
import { numberDirective } from './directive/number.directive';
import { weightDirective } from './directive/weight.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { ConfirmationCommentDialogComponent } from './confirmation-comment-dialog/confirmation-comment-dialog.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { CommonModule } from '@angular/common';  
@NgModule({
    imports: [FormsModule,MaterialModule,CommonModule],
    declarations: [weightDirective, numberDirective, alphaDirective, alphaNumericDirective, ConfirmationDialogComponent, ShowImageComponent, ConfirmationCommentDialogComponent],
    entryComponents: [ConfirmationDialogComponent, ShowImageComponent, ConfirmationCommentDialogComponent],
    exports: [weightDirective, numberDirective, alphaDirective, alphaNumericDirective]
})
export class SharedModule { }
