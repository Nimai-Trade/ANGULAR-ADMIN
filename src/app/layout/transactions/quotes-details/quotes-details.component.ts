import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../transactions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';

@Component({
  selector: 'app-quotes-details',
  templateUrl: './quotes-details.component.html',
  styleUrls: ['./quotes-details.component.scss']
})
export class QuotesDetailsComponent implements OnInit {

  quatationData: any;

  constructor(private service: TransactionService, public dialogRef: MatDialogRef<TransactionDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadQuotationDetail();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadQuotationDetail() {
    this.service.loadQuotationDetail(this.data.id).subscribe(
      (res) => {
        this.quatationData = res;
        console.log(this.quatationData);
      });
  }
}
