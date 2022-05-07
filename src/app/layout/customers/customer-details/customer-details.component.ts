import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
show:boolean=false;
  customerData: any;
  result = '';
  rightList : any;
  myRights : any;
  customerPop: any="";
  
  constructor(private service: CustomerService, public sharedUtilService: SharedUtilService, private dialog: MatDialog, public dialogRef: MatDialogRef<CustomerDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadCustomerDetail();
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
  }

  displayStyle = "none";
  
  openPopup(data) {
console.log(data)

    this.displayStyle = "block";

    this.service.loadCustomerDetail(data).subscribe(
      (res) => {
        this.customerPop = res;
      
        console.log(this.customerData);
      });


  }
  closePopup() {
    this.displayStyle = "none";
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadCustomerDetail() {
    this.service.loadCustomerDetail(this.data.id).subscribe(
      (res) => {
        this.customerData = res;
        if(this.customerData.subscriberType=='CUSTOMER'){
          this.show=true;
        }
        console.log(this.customerData);
      });
  }

  confirmDialog(status, sub) {
    console.log("userId---",sub)
    const message = 'Are you sure you want to ' + status + sub.userId +'?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '50%',
      height: '45%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        if(sub.status=="ACTIVE"){
          updateStatus="INACTIVE"
        }else{
          updateStatus="ACTIVE"
        }
        const reqData = {
          'userId': sub.userId,
          'status': updateStatus,
          'approverName': localStorage.getItem('nimaiId'),
          'remark': this.result['data']
        };
        this.service.removeSubsidiary(reqData).subscribe(
          (res) => {
            let msg="";
            if(sub.status=="ACTIVE"){
              msg=res['message'];
            }else{
              msg="Subsidiary "+sub.userId + " Activated Successfully."
            }
            this.sharedUtilService.showSnackBarMessage(msg);
            this.loadCustomerDetail();
          }, (error) => {
             console.log("res---",error)
             this.sharedUtilService.showSnackBarMessage(error.error.message);
             
           });
      }
    });

  }
}
