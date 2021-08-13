import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../../transactions/transactions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bank-quote-detail',
  templateUrl: './bank-quote-detail.component.html',
  styleUrls: ['./bank-quote-detail.component.scss']
})
export class BankQuoteDetailComponent implements OnInit {

  quatationData: any;

  constructor(private service: TransactionService, public dialogRef: MatDialogRef<BankQuoteDetailComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

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
