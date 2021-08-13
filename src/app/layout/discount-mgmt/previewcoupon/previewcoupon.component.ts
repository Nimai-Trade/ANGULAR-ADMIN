import { Component, OnInit, Inject } from '@angular/core';
import {DiscountMgmtService } from '../discount-mgmt.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-previewcoupon',
  templateUrl: './previewcoupon.component.html',
  styleUrls: ['./previewcoupon.component.scss']
})
export class PreviewcouponComponent implements OnInit {
  couponForm: any;
  showPecentage=false;
  constructor(private service: DiscountMgmtService, public dialogRef: MatDialogRef<PreviewcouponComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
      this.getCouponsDetailsById();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }
  public dateFormat(date: string): string {
    let formatedDate = formatDate(new Date(date), "MM/dd/yyyy", 'en-US');
    return formatedDate;
  }
  getCouponsDetailsById() {
    //console.log("this.data.id")
    this.service.getCouponDetailsById(this.data.id).subscribe(
      (res) => {     
        this.couponForm = res;    
        this.couponForm.startDate=this.dateFormat(this.couponForm.startDate)
        this.couponForm.endDate=this.dateFormat(this.couponForm.endDate)
        if(this.couponForm.discountType=='%'){
         // console.log("this.showPecentage--",this.showPecentage)
          this.showPecentage=true;
          this.couponForm.amount=this.couponForm.maxDiscount;
        }
      });
  }
}
