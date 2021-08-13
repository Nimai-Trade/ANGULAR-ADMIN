import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StockComponent } from '../stock/stock.component';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: any;
    @Input() label: string;
    @Input() data: number;
    @Input() isDetail = true;
    @Input() viewDetail: number;

    constructor(public dialog: MatDialog) { }

    ngOnInit() { }

    viewDetails() {
        const dialogRef = this.dialog.open(StockComponent, {
            width: '50%',
            height: '80%',
            data: { title: this.label, id: this.viewDetail },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }
}
