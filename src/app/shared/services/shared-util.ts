import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import * as moment_ from 'moment';
const moment = moment_;


@Injectable({
  providedIn: 'root'
})
export class SharedUtilService {

  constructor(private snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showSnackBarMessage(message: string, time?: number) {
    this.snackBar.open(message, '', {
      duration: time || 4000, horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  convertToDate(date: Date) {
    var d = new Date(date);
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    curr_month++;
    var curr_year = d.getFullYear();
    return new Date(curr_month + "/" + curr_date + "/" + curr_year + ' 00:00:00 AM')
  }

  handleError(error) {
    let errorMessage = '';
    if (error.headers) {
      if (error.headers.get('Error')) {
        errorMessage = error.headers.get('Error')
      }
      else if (error.error) {
        errorMessage = error.error
      }
    }
    return errorMessage;
  }

  public cloneForm<T extends AbstractControl>(control: T): T {
    let newControl: T;

    if (control instanceof FormGroup) {
      const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls;

      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.cloneForm(controls[key]));
      })

      newControl = formGroup as any;
    }
    else if (control instanceof FormArray) {
      const formArray = new FormArray([], control.validator, control.asyncValidator);

      control.controls.forEach(formControl => formArray.push(this.cloneForm(formControl)))

      newControl = formArray as any;
    }
    else if (control instanceof FormControl) {
      newControl = new FormControl(control.value, control.validator, control.asyncValidator) as any;
    }
    else {
      throw new Error('Error: unexpected control value');
    }

    if (control.disabled) newControl.disable({ emitEvent: false });

    return newControl;
  }

  public dateWithoutTime(date: any): any {
    let datePick: any;
    date = new Date(date);
    let isoDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    let indexT = isoDate.indexOf('T');
    let substring = isoDate.substring(0, indexT);
    substring += "T00:00:00.000+0000";
    datePick = substring;
    return moment(datePick).hours(0).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DDTHH:mm:ss');
  }

}