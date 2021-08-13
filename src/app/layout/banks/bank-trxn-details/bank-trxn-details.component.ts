import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../../transactions/transactions.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';

@Component({
  selector: 'app-bank-trxn-details',
  templateUrl: './bank-trxn-details.component.html',
  styleUrls: ['./bank-trxn-details.component.scss']
})
export class BankTrxnDetailsComponent implements OnInit {
 
  transactionData: any;

  constructor(private service: TransactionService,private dialog: MatDialog, public dialogRef: MatDialogRef<BankTrxnDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadTransactionDetail();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadTransactionDetail() {
    this.service.loadTransactionDetail(this.data.id).subscribe(
      (res) => {
        this.transactionData = res;
        console.log(this.transactionData);
      });
  }

  showImage(imgData){
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
