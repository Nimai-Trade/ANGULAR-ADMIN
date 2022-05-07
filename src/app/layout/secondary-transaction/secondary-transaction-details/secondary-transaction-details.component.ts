import { Component, OnInit, Inject ,ElementRef} from '@angular/core';
import { TransactionService } from '../transactions.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';
import { ViewChild } from '@angular/core'
@Component({
  selector: 'app-secondary-transaction-details',
  templateUrl: './secondary-transaction-details.component.html',
  styleUrls: ['./secondary-transaction-details.component.scss']
})
export class SecondaryTransactionDetailsComponent implements OnInit {
  @ViewChild('divToScroll') divToScroll: ElementRef;
  transactionData: any;
  requirement: string;

  constructor(private service: TransactionService,private dialog: MatDialog, public dialogRef: MatDialogRef<SecondaryTransactionDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

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
if(this.transactionData.requirement=='ConfirmAndDiscount')
this.requirement='Confirmation and Discounting';
else if(this.transactionData.requirement=='BankGuarantee')
this.requirement='Bank Guarantee';
else if(this.transactionData.requirement=='Refinance')
this.requirement='Refinancing';
else if(this.transactionData.requirement=='Banker')
this.requirement="Banker's Acceptance";
else if(this.transactionData.requirement=='Confirmation')
this.requirement='Confirmation';
else
this.requirement='Discounting';
        // <td *ngIf="transactionData.requirement=='Banker'"><input matInput value={{transactionData.requirement}} readonly="true"></td>
        // <td *ngIf="transactionData.requirement=='ConfirmAndDiscount'"><input matInput value={{transactionData.requirement}} readonly="true"></td>
        // <td *ngIf="transactionData.requirement=='Refinance'"><input matInput value={{transactionData.requirement}} readonly="true"></td>
        // <td *ngIf="transactionData.requirement=='BankGuarantee'"><input matInput value={{transactionData.requirement}} readonly="true"></td>
   


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
