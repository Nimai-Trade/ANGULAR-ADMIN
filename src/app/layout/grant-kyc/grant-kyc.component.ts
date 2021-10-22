import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';
import { GrantkycService } from './grantkyc.service';
@Component({
  selector: 'app-grant-kyc',
  templateUrl: './grant-kyc.component.html',
  styleUrls: ['./grant-kyc.component.scss']
})
export class GrantKycComponent implements OnInit {

  message:any;
  kycForm: any;
  public pagerConfig: any;
 // public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  kycListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  kycList: any = [];
  displayColumns: string[] = ['position', 'userid', 'kycType', 'documentName', 'country', 'reason','status', 'document', 'actions'];
  result = '';
  loading = false;
  user : any;
  //isHide = false;
  constructor(private formBuilder: FormBuilder, private service: GrantkycService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.kycListForm = formBuilder.group({
      status: 'Maker Approved',
    });
  }

  ngOnInit() {
    this.setPagerConfig();
    this.user = localStorage.getItem('nimaiId');
  }


  ngAfterViewInit() {
    this.loadKycList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'id',
      direction: direction || 'desc',
      totalItems: totalItems || 0
    };
    // this.pagerConfig = {
    //   pageIndex: pageIndex || 0,
    //   pageSize: pageSize || 5,
    //   sortBy: sortBy || 'id',
    //   direction: direction || 'desc',
    //   totalItems: totalItems || 0
    // };
  }
  selectAll(selectedCheckboxes) {
    this.selectedCheckboxes = selectedCheckboxes;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  masterToggle(checked: boolean) {
    this.selectedCheckboxes = [];
    if (checked) {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.selectedCheckboxes.push(row);
      });
    } else {
      this.dataSource.data.forEach(row => {
        this.selection.clear();
        this.selectedCheckboxes.splice(this.selectedCheckboxes.indexOf(row), 1);
      });
    }
    this.selectAll(this.selectedCheckboxes);
  }

  onSortChange(event) {
    this.masterToggle(false);
    this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, event.active, event.direction);
    this.loadKycList();
  }

  onPageChange(event?) {
    this.masterToggle(false);
    if (event === undefined) {
    } else {
      this.pagerConfig.sortBy = event.sortBy;
      this.pagerConfig.direction = event.direction;
      this.pagerConfig.pageIndex = event.pageIndex;
      this.pagerConfig.pageSize = event.pageSize;
    }
    this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadKycList();
  }


  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadKycList();
  }

  loadKycList() {
   // this.spinnerService.show()
    this.service.getGrantKycList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.kycListForm.value).subscribe((res) => this.onSuccess(res));
  }

  onSuccess(res: any) {
  //  this.spinnerService.show();
    if (res !== undefined) {
      this.kycList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        this.kycList.push(item);
      });            
      if(this.kycList.length>0){
        this.dataSource = new MatTableDataSource(this.kycList)
       // this.spinnerService.hide()
      }
      // else{
      //   this.isHide=true;
      // }      
    }
  }


  // confirmDialog(status, empId): void {
  //   const message = 'Are you sure you want to ' + status +' this Employee ?';
  //   const dialogData = new ConfirmDialogModel('Confirm Action', message);
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     maxWidth: '400px',
  //     data: dialogData
  //   });

  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     this.result = dialogResult;
  //     let updateStatus = '';
  //     if (dialogResult) {
  //       if (status === 'Approve') {
  //         updateStatus = 'ACTIVE';
  //       } else {
  //         updateStatus = 'INACTIVE';
  //       }
  //       const reqData = {
  //         'empId': empId,
  //         'status': updateStatus
  //       };
  //       this.service.updateEmployeeStatus(reqData).subscribe(
  //         (res) => {
  //           this.sharedUtilService.showSnackBarMessage(res['message']);
  //           this.loadEmployeeList()
  //         });
  //     }
  //   });
  // }

  showDocument(imgData) {      
    const reqData = {
      'kycId': imgData.kycid,     
    };
    this.service.viewMakerApprovedKycByKycId(reqData).subscribe(
      (res: any) => {
        const dialogRef = this.dialog.open(ShowImageComponent, {
          width: '50%',
          height: '75%',
          data: { title: 'KYC Document', image: res.encodedFileContent },
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          // this.loadCustomerList();
        });
      })
  }

  
  confirmDialog(status, kycid) {
    // console.log('status ' + status + ' id ' + item.controls['kycid'].value);
   console.log("item.controls['reason'].value");
    if(status=='Approved'){
      var stat='Approve';
      this.message = 'Are you sure you want to ' + stat + ' the KYC Document?';
    }else if(status=='Rejected'){
      var stat='Reject';
      this.message = 'Are you sure you want to ' + stat + ' the KYC Document?';
    }
    const dialogData = new ConfirmDialogModel('Confirm Action', this.message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '50%',
      height: '45%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        const reqData = {
          'kycid': kycid,
          'kycStatus': status,
          'approverName': localStorage.getItem('nimaiId'),
          'approvalReason': this.result['data'],
          'comment': this.result['data']
        };
        this.service.CheckerkycStatusUpdate(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.loadKycList();
          }, (error) => {
            console.log("res---",error)
            this.sharedUtilService.showSnackBarMessage(error.error.message);
        });
      }
    });

  }
}