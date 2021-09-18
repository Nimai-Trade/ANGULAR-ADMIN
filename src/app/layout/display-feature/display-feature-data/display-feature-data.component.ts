import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayFeatureService } from '../display-feature.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
//import { resetComponentState } from '@angular/core/src/render3/state';
//import { resetComponentState } from '@angular/core';
@Component({
  selector: 'app-display-feature-data',
  templateUrl: './display-feature-data.component.html',
  styleUrls: ['./display-feature-data.component.scss']
})
export class DisplayFeatureDataComponent implements OnInit {


  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  public pagerConfig: any;
  public pageSizeOptions = [5, 10, 20, 30];
  displayColumns: string[] = ['position','createdDate','avgAmount','country','ccy'];
  public selectedCheckboxes = [];
  dataSource = new MatTableDataSource<Element[]>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, /* TODO: add static flag */ null) paginator: MatPaginator;
  @ViewChild(MatSort, /* TODO: add static flag */ null) sort: MatSort;
  countryList: any;

  displayListForm:any;
  displayFeatureList: any= [];
  edited : any;
  fileInfos: Observable<any>;

  constructor(private formBuilder: FormBuilder, private router: Router,private service: DisplayFeatureService ,private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) { 
    this.displayListForm = formBuilder.group({
      country: []
    });
  }

  ngOnInit() {
    this.setPagerConfig();
    this.fileInfos = this.service.downloadExample();
    this.loadCountryDetail();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.service.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.service.downloadExample();
        }
        this.loadDisplayFeatureList();
        this.cdr.detectChanges();
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  downloadSample(){
     this.service.downloadExample().subscribe(
      (res) => { });
  }

  

  loadDisplayFeatureList() {
    this.service.loadCountryDetails(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, this.displayListForm.value).subscribe((res) => this.onSuccess(res));
  }
  ngAfterViewInit() {
    this.loadDisplayFeatureList();
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
    this.loadDisplayFeatureList();
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
    this.loadDisplayFeatureList();
  }

  onPageNumberChange(index: number) {
    this.paginator.pageIndex = index - 1;
    this.setPagerConfig(this.paginator.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction);
    this.loadDisplayFeatureList();
  }

  onSuccess(res: any) {
    if (res !== undefined) {
      this.displayFeatureList = [];
      const totalCount = res.totalElements;
      this.setPagerConfig(this.pagerConfig.pageIndex, this.pagerConfig.pageSize, this.pagerConfig.sortBy, this.pagerConfig.direction, totalCount);
      res.content.forEach(item => {
        console.log(item);
        this.displayFeatureList.push(item);
      });
      this.dataSource = new MatTableDataSource(this.displayFeatureList);
    }
  }

  loadCountryDetail() {
    this.service.getCountryList().subscribe(
      (res) => {
        console.log('<<>>'+res);
        this.countryList = res;
        
      });
  }

  onChangeType(selCountry) {
    console.log('selCountry ' + selCountry);
    this.loadDisplayFeatureList();
  }
}
