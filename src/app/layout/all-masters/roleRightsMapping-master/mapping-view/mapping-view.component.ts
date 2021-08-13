import { Component, OnInit, Inject } from '@angular/core';
import { AllMasterService } from '../../all-masters.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeAddComponent } from '../../employee-master/employee-add/employee-add.component';

@Component({
  selector: 'app-mapping-view',
  templateUrl: './mapping-view.component.html',
  styleUrls: ['./mapping-view.component.scss']
})
export class MappingViewComponent implements OnInit {

  roleData: any;

  constructor(private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    
   }

  ngOnInit() {
    this.loadRoleRightDetail();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadRoleRightDetail() {
    this.service.getRoleDetailsById(this.data.id).subscribe(
      (res) => {
        this.roleData = res;
      });
  }


}
