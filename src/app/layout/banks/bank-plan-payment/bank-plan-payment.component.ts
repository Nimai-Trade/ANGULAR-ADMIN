import { Component, OnInit, Inject } from '@angular/core';
import { BanksService } from '../banks.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';

@Component({
  selector: 'app-bank-plan-payment',
  templateUrl: './bank-plan-payment.component.html',
  styleUrls: ['./bank-plan-payment.component.scss']
})
export class BankPlanPaymentComponent implements OnInit {
  hideVasPlan:any;
  paymentData: any;
  result = '';
  rightList : any;
  myRights : any;
  empCode:any;
  constructor(private service: BanksService, private dialog: MatDialog, public dialogRef: MatDialogRef<BankPlanPaymentComponent>, @Inject(MAT_DIALOG_DATA) public data,  public sharedUtilService: SharedUtilService) { }


  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.empCode = localStorage.getItem('nimaiId');
    this.loadPaymentDetail();
  }


  closeDialog() {
    return this.dialogRef.close({ result: true });
  }


  loadPaymentDetail() {
    this.service.planOfPaymentDetail(this.data.id).subscribe(
      (res) => {
        this.paymentData = res;
        console.log("Bank Payment---",this.paymentData[0].userid);
        if(this.paymentData[0].userid.startsWith('BA')){
          this.hideVasPlan=true;
        }else{
          this.hideVasPlan=false;
        }
      });
  }

  paymentAction(status, item){
    console.log('status ' + status + ' id ' + item.userid);
    let msgStatus=""
    if(status==="Approved"){
      msgStatus="Approve"
    }else{
      msgStatus="Reject"
    }
    const message = 'Are you sure you want to ' + msgStatus + ' the Payment?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '50%',
      height: '45%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(' >>> '+this.result);
      let updateStatus = '';
      if (dialogResult) {
        const reqData = {
          'userId': item.userid,
          'status': status === "Approved" ? 'Maker Approved': status,
          'subcriptionId': item.splSerialNumber,
          'makerComment': this.result['data']
        };
        this.service.updatePaymentStatus(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            // item.get('paymentStatus').setValue('Maker '+status);
            this.loadPaymentDetail();
          });
      }
    });

  }
}

