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
  subsidiary: string;

  constructor(private service: SubscriptionService, public dialogRef: MatDialogRef<SubscriptionViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
      this.getSubscriptionDetailsById();
      if(localStorage.getItem('customerType')=="BANK"){
        this.subsidiary="Additional Users";
      }else{
        this.subsidiary="Subsidiaries";
      }
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