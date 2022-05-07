import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../transactions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SecondaryTransactionDetailsComponent } from '../secondary-transaction-details/secondary-transaction-details.component';

@Component({
  selector: 'app-secondary-quotes-details',
  templateUrl: './secondary-quotes-details.component.html',
  styleUrls: ['./secondary-quotes-details.component.scss']
})
export class SecondaryQuotesDetailsComponent implements OnInit {

  
  quatationData: any;

  constructor(private service: TransactionService, public dialogRef: MatDialogRef<SecondaryTransactionDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

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
