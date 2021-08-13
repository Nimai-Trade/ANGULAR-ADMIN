import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';
import { BanksService } from '../../banks/banks.service';
import { CustomerKycComponent } from '../../customers/customer-kyc/customer-kyc.component';

@Component({
  selector: 'app-referrer-kyc',
  templateUrl: './referrer-kyc.component.html',
  styleUrls: ['./referrer-kyc.component.scss']
})
export class ReferrerKycComponent implements OnInit {

  kycData: FormArray;
  kycForm: any;
  resData: any;
  result = '';
  rightList: any;
  myRights: any;
  userId:any;
  empCode:any;
  constructor(private fb: FormBuilder, private service: BanksService, private dialog: MatDialog, public dialogRef: MatDialogRef<CustomerKycComponent>, @Inject(MAT_DIALOG_DATA) public data, public sharedUtilService: SharedUtilService) {
    this.kycForm = fb.group({
      kycData: this.fb.array([]),
    });
  }


  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.empCode = localStorage.getItem('nimaiId');  
    this.loadKycDetails();
  }


  closeDialog() {
    return this.dialogRef.close({ result: true });
  }


  loadKycDetails() {
    this.userId=this.data.id
    this.service.kycDetail(this.data.id).subscribe(
      (res) => {
        this.resData = res;
        this.kycData = this.kycForm.get('kycData') as FormArray;
        this.resData.forEach(element => {
          let aaaa = this.fb.group({
            kycid: [element.kycid],
            kycType: [element.kycType],
            kycStatus: [element.kycStatus],
            encodedFileContent: [element.encodedFileContent],
            docType: [element.docType],
            docName: [element.docName],
            country: [element.country],
            reason: [element.reason],
            userid: [element.userid],
            makerComment:[element.reason],
            checkerComment:[element.checkerComment]
          });
          this.kycData.push(aaaa);
        });

        console.log(this.kycData);
      });
  }



  kycAction(status, item) {
    let message;
    if(status=='Approved'){
      message = 'Are you sure you want to ' + 'Approve' + ' the KYC Document?';
    }
    else if(status=='Rejected'){
      message = 'Are you sure you want to ' + 'Reject' + ' the KYC Document?';
    }
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '45%',
      height: '30%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        const reqData = {
          'kycid': item.controls['kycid'].value,
          'reason': item.controls['reason'].value,
          'comment':item.controls['reason'].value,
          'kycStatus': 'Maker ' + status,
          'approverName': localStorage.getItem('nimaiId')
        };
        this.service.kycStatusUpdate(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            item.get('kycStatus').setValue('Maker ' + status);
            // this.loadKycDetails();
            // this.router.navigate(['app', 'transactions', 'transactions-list']);
          });
      }
    });

  }

  showImage(imgData) {
    console.log(imgData);
    // alert(imgData);
    const dialogRef = this.dialog.open(ShowImageComponent, {
      width: '50%',
      height: '75%',
      data: { title: 'KYC Document', image: imgData },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadCustomerList();
    });
  }
}
