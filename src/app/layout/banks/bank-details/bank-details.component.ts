import { Component, OnInit, Inject } from '@angular/core';
import { BanksService } from '../banks.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  customerData: any;
  result = '';
  rightList : any;
  myRights : any;
  countryInterested :any;
  countryLimit:any;
  viewMoreFlag:boolean=false;
  constructor(private service: BanksService, public sharedUtilService: SharedUtilService, private dialog: MatDialog, public dialogRef: MatDialogRef<BankDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadBankDetail();
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadBankDetail() {
    this.service.loadBankDetail(this.data.id).subscribe(
      (res) => {
        this.customerData = res;
        console.log(this.customerData);
        this.countryInterested =this.customerData.intCountries.split(',');        
        if(this.countryInterested.length>5){
          console.log("this.countryInterested.length",this.countryInterested.length)
          this.viewMoreFlag=true;
          this.countryLimit=this.countryInterested.length;
        }else{
          console.log("this.countryInterested.length",this.countryInterested.length)
          this.countryLimit=5;
        }
      });
  }

  confirmDialog(status, sub) {
    const message = 'Are you sure you want to ' + status + sub.userId +'?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '40%',
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
            this.loadBankDetail();
          });
      }
    });

  }
}
