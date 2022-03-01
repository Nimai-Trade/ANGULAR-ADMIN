import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl,FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import {DiscountMgmtService } from '../discount-mgmt.service';
import { formatDate } from '@angular/common';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.scss']
})
export class AddcouponComponent implements OnInit {
  
  public watermark: string = 'Select a time';
  // sets the format property to display the time value in 24 hours format.
  public value: Date = new Date(2000, 2, 10, 13, 30, 0);
  public formatString: string = 'HH:mm:ss';
  public interval: number = 30;
  toHide:boolean=false;
  counter:any;
  subsType:any;
  bankType:any;
  pCountry:any;
  public couponForm: FormGroup;
  selectedIndex = 0;
  //couponForm: any;
  files: any;
  employeeData: any;
  statusList: any;
  loading = false;
  countryList: any = [];
  dropdownSettings = {};
  countryName: any = [];
  planList:any;
  roleList: any;
  countrySelection: any = [];
  mobNumberPattern = '/^[6-9]\d{9}$/';
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  showPecentage=false;
  showCreate=true;
  public date: string = formatDate(new Date(), "MM-dd-yyyy", 'en-US');
  public time: string = formatDate(new Date(), "hh:mm:ss", 'en-US');
  result = '';
  toggle:boolean = true;
  dateError:boolean=false;
  public couponSubmit = false;
  planValue:any;
  amountError:boolean=false;
  discountAmountError:boolean=false;
  discountType:any;  
  flag:any;      
  uploadedFile: File[] = [];
  couponDetails:any;
  selectedcountry: any=[];
  disabledOther: boolean;
  selectedItems: string[];
  CurrentDate: string;
  constructor(private fb: FormBuilder, private service: DiscountMgmtService, public dialogRef: MatDialogRef<AddcouponComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
   
  }
  ngOnInit() {
    this.CurrentDate=  formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.flag=0;
    this.couponForm = this.fb.group({
      status: ['ACTIVE', Validators.required],
      discountType:['',Validators.required],
      amount: ['',Validators.required],
      countryName: ['', Validators.required],
      subscriptionPlan:['',Validators.required],
      couponFor:['',Validators.required],
      startDate:['',Validators.required],
      startTime:[''],
      endDate:['',Validators.required],
      endTime:['',],
      discountPercentage:['',Validators.required],
      maxDiscount:[''],
      details:this.fb.array([this.addcouponDetails()]),
    
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'country',
      textField: 'country',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll:false,
      autoPosition: false
    };
    this.statusList = [{ 'code': 'ACTIVE', 'name': 'ACTIVE' }, { 'code': 'INACTIVE', 'name': 'INACTIVE' }];
    if (this.data.id) {
      this.loadCouponDetails();
    } else {
      this.employeeData = '';
    }
    this.getCountryList();  
  }
  
  UploadExcel(event){
    if (event.target.files.length > 0) 
    {
      this.uploadedFile.push(<File>event.target.files[0]);
      this.flag=1;
    }
  }
  downloadExcel():void {
    let item = this.couponForm.get('details') as FormArray;
    this.couponDetails=Array.prototype.map.call(item.value, s => s.couponCode).toString(); // "A,B,C"Array.prototype.map.call(arrayObjects, s => s.name).toString(); // "A,B,C"
    //console.log("this.couponDetails---->",this.couponDetails)
    let filename="personalizedCoupon"
    this.pCountry=this.couponForm.get("countryName").value
    if(this.couponForm.get("couponFor").value =='Bank As Customer'){
      this.subsType='Bank';
      this.bankType='Customer'; 
    }else if(this.couponForm.get("couponFor").value =='BANK'){
      this.subsType='Bank';
      this.bankType='UNDERWRITER';
    }else{
      this.subsType='Customer';
      this.bankType='';
    }
  let data = {
    "countryName": this.pCountry,
    "customerType": this.subsType,
    "bankType": this.bankType,
    "filename":filename,
    "coupon":this.couponDetails
  };  
  this.service.getExcel(data).subscribe(
      (res) => {});
 }

  addcouponDetails():  FormGroup {
    return this.fb.group({
      quantity: ['', Validators.required],
      couponCode: ['', Validators.required]
    });
  }
  addMorePhase() {
    let items = this.couponForm.get('details') as FormArray;
    this.counter=items.length;
    if (items.length < 3)
    {
      items.push(this.addcouponDetails());
    }
    if(this.counter==2){
      this.toHide=true;
    }

  }
  removeQuantity(i: number) {
    let items = this.couponForm.get('details') as FormArray;
    items.removeAt(i);
    if(items.length<3){
      this.toHide=false;
    }
  }
  limitDecimalPlaces(e, count) {
    
    console.log(e)
    if (e.target.value.indexOf('.') == -1) { return; }
    if ((e.target.value.length - e.target.value.indexOf('.')) > count) {
      e.target.value = parseFloat(e.target.value).toFixed(count);
    }
    if(e.data=='-'){return;}
  }  
  checkAmount(event) {
    if(event>this.planValue){
      if(this.discountType==="%")
      {
        this.discountAmountError=true;
        this.couponForm.controls.maxDiscount.setValue(this.planValue);
      } 
      else
      {  
        this.amountError=true;
        this.couponForm.controls.amount.setValue(this.planValue);
      }
    }else{
      this.amountError=false;
      this.discountAmountError=false;
    }
  }
valueChanged(){
   if(new Date(this.couponForm.controls['endDate'].value)<new Date(this.couponForm.controls['startDate'].value)){
      this.dateError=true;
   }else{
      this.dateError=false;
   }
}

validateRegexFields(event){
  event.preventDefault();
}

calculateAmount(value){
  let discountAmount=(this.planValue*value/100)
  this.couponForm.controls.maxDiscount.setValue(discountAmount);
}
  checkType(value){
    let selectedPlan = this.couponForm.get('subscriptionPlan').value;
    this.discountType=value
    if(this.planList){
    for (let i = 0; i < this.planList.length; i++) {
      if(this.planList[i].planName===selectedPlan){
        this.planValue=this.planList[i].pricing
        // if(value==="%"){ 
        //   this.couponForm.controls.maxDiscount.setValue(this.planList[i].pricing);
        // }else{
        //   this.couponForm.controls.amount.setValue(this.planList[i].pricing);
        // }

      }
    }
   }
    if(value==="%")
      this.showPecentage=true
    else  
      this.showPecentage=false
  }

  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  // onSubmitCoupon() {
  //   this.couponSubmit=true;
  //   if(this.showPecentage){
  //     this.couponForm.get("amount").disable();
  //     this.couponForm.get("discountPercentage").enable();
  //   }else{
  //     this.couponForm.get("discountPercentage").enable();
  //     this.couponForm.get("discountPercentage").disable();
  //   }
  //   let data = this.couponForm.value;
  //   data.startDate  =(data.startDate) ? this.dateFormat1(data.startDate) : '';
  //   data.endDate  =(data.endDate) ? this.dateFormat1(data.endDate) : '';
  //   if (this.couponForm.valid) {
  //     const formData: FormData = new FormData();
  //     formData.append('jsonFile', JSON.stringify(data));
  //   if(this.flag===1)
  //     formData.append('excelFile', this.uploadedFile[0], this.uploadedFile[0].name);
  //     formData.append('flag',this.flag)
  //     this.service.saveCouponDetails(formData).subscribe((res) => this.onSuccess(res));
  //   } else {
  //     this.validateAllFormFields(this.couponForm);
  //   }
  // }
  onSubmitCoupon(){
  this.couponSubmit=true;
  if(this.showPecentage){
  this.couponForm.get("amount").disable();
  this.couponForm.get("discountPercentage").enable();
  }else{
  this.couponForm.get("discountPercentage").enable();
  this.couponForm.get("discountPercentage").disable();
  }
  
  let data = this.couponForm.value;
  data.startTime= formatDate(new Date(data.startTime), "HH:mm:ss", 'en-US');
  data.endTime= formatDate(new Date(data.endTime), "HH:mm:ss", 'en-US');
  data.startDate  =(data.startDate) ? this.dateFormat1(data.startDate) : '';
  data.endDate  =(data.endDate) ? this.dateFormat1(data.endDate) : '';
  //console.log("data----",data)

  if (this.couponForm.valid) {
      const message = 'Are you sure you want to save Coupon?';
      const dialogData = new ConfirmDialogModel('Confirm Action', message);
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        //maxWidth: '550px',
        data: dialogData,
        width: '45%',
        height: '30%'
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        this.result = dialogResult;
        if (dialogResult) {
          const formData: FormData = new FormData();
          formData.append('jsonFile', JSON.stringify(data));
          if(this.flag===1)
            formData.append('excelFile', this.uploadedFile[0], this.uploadedFile[0].name);
          formData.append('flag',this.flag)
          this.service.saveCouponDetails(formData).subscribe((res) => this.onSuccess(res));
        } 
      }); 
    } else {
      this.validateAllFormFields(this.couponForm);
    }     
  }
  getPlan(){
    let data = {

      //discountCountry recent edit
      "discountCountry": this.couponForm.get("countryName").value,
      "customerType": this.couponForm.get("couponFor").value
  }
  console.log(data)
  this.service.getplanName(data).subscribe(
      (res) => {
        this.planList = res;
      });
  }

  validateAllFormFields(couponForm: FormGroup) {
    Object.keys(couponForm.controls).forEach(field => {
      const control = couponForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return !this.couponForm.get(field).valid && this.couponForm.get(field).touched;
  }


  onSuccess(res) {
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }
  public dateFormat(date: string): string {
    let formatedDate = formatDate(new Date(date), "MM/dd/yyyy", 'en-US');
    return formatedDate;
  }
  public dateFormat1(date: string): string {
    let formatedDate = formatDate(new Date(date), "yyyy-MM-dd", 'en-US');
    return formatedDate;
  }
  loadCouponDetails() {
    this.service.getCouponDetailsById(this.data.id).subscribe(
      (res) => {
        if(res['status']==="Inactive"){
          this.toggle = !this.toggle;
        }
        Object.keys(res).forEach(name => {    
          if (this.couponForm.controls[name]) {          
            if (this.couponForm.controls['discountType'].value==="%") {
              this.showPecentage=true;
            }else{
              this.showPecentage=false;
            }
            this.couponForm.controls[name].patchValue(res[name]);            
            this.couponForm.get('startDate').patchValue(new Date(this.dateFormat(res['startDate'])));
            this.couponForm.get('endDate').patchValue(new Date(this.dateFormat(res['endDate'])));
           // this.couponForm.controls[name].disable();
            this.showCreate=false;
          }
        });
      });
  }
  deactivateCoupon(status,discountId){
    const message = 'Are you sure you want to Deactive record ?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
     // maxWidth: '550px',
      data: dialogData,
      width: '45%',
      height: '30%'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult) {
        const reqData = {
          "discountId":discountId,
          "status":"Deactivate",  
          "modifiedBy":"Admin"
        };
        this.service.updateCouponStatus(reqData).subscribe(          
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            this.onSuccess(res)
          });
      }
    });
  }
  getCountryList() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;
        let item = {country: "All", code: "All"}
        this.countryList.push(item);
        this.countryList.unshift(item);
        this.selectedcountry=res;
        for (let entry of this.countryList) {
          this.countryName.push(entry.country);
        }

      });
  }




  public attachSample(attachSampleFile: NgxFileDropEntry[], item) {
    if (attachSampleFile[0].fileEntry.isFile) {
      const fileEntry = attachSampleFile[0].fileEntry as FileSystemFileEntry;
      const reader = new FileReader();
      fileEntry.file((file: File) => {
        if (Math.round(file.size / 1024) <= 2048) {
          this.files.push(file);     
          this.flag=1;            
          // reader.readAsDataURL(file);
          // reader.onload = () => {
          //   item.get('imageUrl').setValue(reader.result);
          // };
        }
      });
    }
    
  }
  
  closeNone(){
    this.couponForm.get('countryName').setValue('');
    this.disabledOther=false
  }
  onKey(value) { 
    this.selectedcountry = this.search(value);    
     }
     search(value: string) { 
       let filter = value.toLowerCase();
       return this.countryList.filter(option => option.country.toLowerCase().startsWith(filter));
     }
   
  onItemSelect(item: any){
    console.log("Item---",item)
    if(item=="All"){
      this.disabledOther=true;  
      this.selectedItems = [ 'All'];
    }else{
      this.disabledOther=false;
    }
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(item: any) {
    console.log(item);
  }
  

}
