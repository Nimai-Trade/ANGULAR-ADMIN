import { Component, OnInit, Inject ,ElementRef} from '@angular/core';
import { TransactionService } from '../transactions.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';
import { ViewChild } from '@angular/core'
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @ViewChild('divToScroll') divToScroll: ElementRef;
  transactionData: any;

  constructor(private service: TransactionService,private dialog: MatDialog, public dialogRef: MatDialogRef<TransactionDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

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
  search(data){
    this.divToScroll.nativeElement.scrollTop = 0;
  }
  showImage(imgData){
    console.log(imgData);
    // alert(imgData);
    const dialogRef = this.dialog.open(ShowImageComponent, {
      width: '50%',
      height: '75%',
      data: { title: 'Document', image: imgData },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadCustomerList();
    });
  }
}
