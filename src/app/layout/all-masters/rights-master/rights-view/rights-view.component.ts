import { Component, OnInit, Inject } from '@angular/core';
import { AllMasterService } from '../../all-masters.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeAddComponent } from '../../employee-master/employee-add/employee-add.component';

@Component({
  selector: 'app-rights-view',
  templateUrl: './rights-view.component.html',
  styleUrls: ['./rights-view.component.scss']
})
export class RightsViewComponent implements OnInit {
  rightData: any;

  constructor(private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    
   }

  ngOnInit() {
    this.loadRightDetail();

  }
  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadRightDetail() {
    this.service.getRightDetailsById(this.data.id).subscribe(
      (res) => {
        this.rightData = res;
      });
  }

}
