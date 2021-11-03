import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { VasPlanAddComponent } from '../vas-plan-add/vas-plan-add.component';
import { VasPlanViewComponent } from '../vas-plan-view/vas-plan-view.component';
import { SubscriptionViewComponent } from '../subscription-view/subscription-view.component';
import { SubscriptionAddComponent } from '../subscription-add/subscription-add.component';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})

export class SubscriptionListComponent implements OnInit {

  // @ViewChild('dropdown')
  show:boolean=false;
  public dropdownObject: DropDownListComponent;
  subscriptionForm: any;
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  vasListForm: any;
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  vasList: any = [];
  displayColumns: string[] = ['position','customerType','countryName', 'planName', 'credits', 'subsidiaries', 'rm', 'validity', 'pricing', 'status', 'actions'];
  result = '';
  countryList: any;
  rightList : any;
  myRights : any;
  countryData: any = [];
  countryVal : any;
  role : any;
  selectedcountry: any;
  isRole: boolean=false;

  constructor(private formBuilder: FormBuilder, private service: SubscriptionService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.subscriptionForm = formBuilder.group({
      country: [],
      customerType:['CUSTOMER', Validators.required],
      status:[]
    });
  }

  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.role = localStorage.getItem('role');
    if(this.role === 'Bank RM'){
      this.subscriptionForm.get('customerType').setValue('BANK');
      
    }else if(this.role === 'Management' || this.role==='Ops Edit' || this.role === 'Ops Admin'){
      this.isRole=true;
    }
    this.getCountryList();  
    this.setPagerConfig();
  }


  ngAfterViewInit() {
    this.loadSubsriptionList();
    this.cdr.detectChanges();
  }

  setPagerConfig(pageIndex?, pageSize?, sortBy?, direction?, totalItems?) {
    this.pagerConfig = {
      pageIndex: pageIndex || 0,
      pageSize: pageSize || 5,
      sortBy: sortBy || 'createdDate',
      direction: direction || 'desc',
      totalItems: totalItems || 0
    };
   console.log("this.pagerConfig--",this.pagerConfig) 
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
    this.loadSubsriptionList();
  }

  onPageChange(event?) {
    //console.log("event--",event)
    this.masterToggle(false);
    if (event === undefined) {
    } else {
      this.pagerConfig.sortBy = event.sortBy;
      this.pagerConfig.direction = event.direction;
      this.pagerConfig.pageIndex = event.pageIndex;
      this.pagerConfig.pageSize = event.pageSize;
    }
    this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadSubsriptionList();
  }

  onPageNumberChange(index: number) {
   //console.log("index--",index)
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadSubsriptionList();
  }

  loadSubsriptionList() {

    if(this.subscriptionForm.value.customerType== 'BANK AS CUSTOMER'){
       
      this.displayColumns = ['position','customerType','countryName', 'planName', 'credits', 'rm', 'validity', 'pricing', 'status', 'actions'];
}else{
  this.displayColumns= ['position','customerType','countryName', 'planName', 'credits', 'subsidiaries', 'rm', 'validity', 'pricing', 'status', 'actions'];

}

this.service.getSubscriptionList(this.pagerConfig.pageIndex, this.pagerConfig.pageSize,  this.pagerConfig.sortBy, this.pagerConfig.direction, this.subscriptionForm.value).subscribe((res) => this.onSuccess(res));
  }
  
  onSuccess(res: any) {
    if (res !== undefined) {
      this.vasList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
      //  console.log(item);
        this.vasList.push(item);
      });
    
      this.dataSource = new MatTableDataSource(this.vasList);
    }
  }

  openSubDialog(title, id): void {
    const dialogRef = this.dialog.open(SubscriptionAddComponent, {
      width: '50%',
      height: '100%',
      data: { title: title, id: id, customerType: this.subscriptionForm['controls'].customerType },
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      this.loadSubsriptionList();
    });
  }

  onPreview(id, status) {
   // console.log('>>>> ' + id);
    const dialogRef = this.dialog.open(SubscriptionViewComponent, {
      width: '50%',
      height: '100%',
      data: { title: 'Subscription Plan Details', id: id, status: status},
      disableClose: true
    }).updatePosition({ right: '0px', bottom: '0px' });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadRoleList();
    });
  }

  
  getCountryList() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;
        this.selectedcountry=res;
        for (let entry of this.countryList) {
          this.countryData.push(entry.country);
        }
      });
  }

  onChangeType(country) {
   console.log(country , this.countryVal)
    this.subscriptionForm.get('country').setValue(country);
    //console.log(this.subscriptionForm['controls'].country +' >> Country Type << ' + country);    
    this.loadSubsriptionList();
  }

  onTypeChange(){
    this.setPagerConfig();
    this.loadSubsriptionList();
  }

  onKey(value) { 
    this.selectedcountry = this.search(value);    
     }
     search(value: string) { 
       let filter = value.toLowerCase();
       return this.countryList.filter(option => option.country.toLowerCase().startsWith(filter));
     }

  // getObject(args) {
  //   var fieldObject = this.dropdownObject.getDataByValue(this.subscriptionForm.controls.country.value);
  //   console.log(fieldObject);
  // }
  // confirmDialog(status, roleId): void {
  //   const message = 'Are you sure you want to ' + (status === 'ACTIVE' ? 'inactive' : 'active') + ' record ?';
  //   const dialogData = new ConfirmDialogModel('Confirm Action', message);
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     maxWidth: '400px',
  //     data: dialogData
  //   });

  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     this.result = dialogResult;
  //     let updateStatus = '';
  //     if (dialogResult) {
  //       if (status === 'ACTIVE') {
  //         updateStatus = 'INACTIVE';
  //       } else {
  //         updateStatus = 'ACTIVE';
  //       }
  //       const reqData = {
  //         'roleId': roleId,
  //         'status': updateStatus
  //       };
  //       this.service.updateRoleStatus(reqData).subscribe(
  //         (res) => {
  //           this.sharedUtilService.showSnackBarMessage(res['message']);
  //           this.loadRoleList();
  //         });
  //     }
  //   });
  }