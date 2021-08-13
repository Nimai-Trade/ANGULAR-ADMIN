import { Component, OnInit, Inject } from '@angular/core';
import { AllMasterService } from '../../all-masters.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeAddComponent } from '../../employee-master/employee-add/employee-add.component';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.scss']
})
export class RoleViewComponent implements OnInit {

  roleData: any;

  constructor(private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    
   }

  ngOnInit() {
    this.loadRoleDetail();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadRoleDetail() {
    this.service.getRoleDetailsById(this.data.id).subscribe(
      (res) => {
        this.roleData = res;
      });
  }


}
