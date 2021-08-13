import { Component, OnInit, Inject } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html',
  styleUrls: ['./subscription-view.component.scss']
})
export class SubscriptionViewComponent implements OnInit {

  
  subscriptionData: any;

  constructor(private service: SubscriptionService, public dialogRef: MatDialogRef<SubscriptionViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
      this.getSubscriptionDetailsById();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  getSubscriptionDetailsById() {
    this.service.getSubscriptionDetailsById(this.data.id).subscribe(
      (res) => {
        this.subscriptionData = res;
      });
  }

}