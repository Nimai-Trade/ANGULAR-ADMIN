import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
// import { InventoryMastersService } from 'src/app/layout/inventory-masters/inventory-masters.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  dataSource = new MatTableDataSource<Element[]>();
  displayedColumns: string[] = ['metalType', 'metalStandard', 'metalColor', 'metalWeight'];
  stockList: any;
  constructor(public dialogRef: MatDialogRef<StockComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  ngOnInit() {
    this.getStockDetails(this.data.id);
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  getStockDetails(id) {
    // this.service.getStockDetails(id).subscribe(
    //   (res) => {
    //     this.stockList = res;
    //     this.dataSource = new MatTableDataSource(this.stockList);
    //   });
  }

}
