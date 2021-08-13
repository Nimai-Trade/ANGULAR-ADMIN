import { Component, OnInit, Inject } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vas-plan-view',
  templateUrl: './vas-plan-view.component.html',
  styleUrls: ['./vas-plan-view.component.scss']
})
export class VasPlanViewComponent implements OnInit {

  vasData: any;

  constructor(private service: SubscriptionService, public dialogRef: MatDialogRef<VasPlanViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
      this.getVasDetailsById();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  getVasDetailsById() {
    this.service.getVasDetailsById(this.data.id).subscribe(
      (res) => {
        this.vasData = res;
      });
  }

}
