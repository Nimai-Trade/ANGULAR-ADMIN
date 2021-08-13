import { Component, OnInit, Inject } from '@angular/core';
import { ReferrerService } from '../referrer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-refer-details',
  templateUrl: './refer-details.component.html',
  styleUrls: ['./refer-details.component.scss']
})
export class ReferDetailsComponent implements OnInit {

  customerData: any;

  constructor(private service: ReferrerService, public dialogRef: MatDialogRef<ReferDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.loadBankDetail();
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadBankDetail() {
    this.service.loadReferDetail(this.data.id).subscribe(
      (res) => {
        this.customerData = res;
        console.log(this.customerData);
      });
  }

}
