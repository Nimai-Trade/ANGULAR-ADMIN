import { Component, OnInit, Inject } from '@angular/core';
import { BanksService } from '../../banks/banks.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-customer-kyc',
  templateUrl: './customer-kyc.component.html',
  styleUrls: ['./customer-kyc.component.scss']
})
export class CustomerKycComponent implements OnInit {

  kycData: FormArray;
  kycForm: any;
  resData: any;
  result = '';
  rightList : any;
  myRights : any;
  userId:any;
  showLink:boolean=false;
  empCode:any;
  filedId: string;
  isCustomer: any;
  bankList: Object;
  preferredBank: any[]=[];
  pbSelection: any[]=[];
  countryList: any = [];
  selectedcountry: any=[];
  dropdownSettings = {};
  preferredBanks: any  = [];
  disabledOther: boolean;
  selectedItems: string[];
  constructor(private fb: FormBuilder, private service: BanksService, private dialog: MatDialog, public dialogRef: MatDialogRef<CustomerKycComponent>, @Inject(MAT_DIALOG_DATA) public data, public sharedUtilService: SharedUtilService) {
    this.kycForm = fb.group({
      kycData: this.fb.array([]),
      "custTurnover":[''],
    "importVolume":[''],
    "exportVolume":[''],
    "yearlyLCVolume":[''],
    "usedLCIssuance":[''],
    "preferredBanks":[''],
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userid',
      textField: 'bankName',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll:false,
      autoPosition: false
    };
    this.loadBankList();
  }
 

  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.empCode = localStorage.getItem('nimaiId'); 

   
      this.loadKycDetails();   
   
  }


  

  loadViewPreferredBank() {
    
   const data= {
      "custUserId": this.userId
    }
this.service.viewPreferredBank(data).subscribe((res)=>{
              this.preferredBank = JSON.parse(JSON.stringify(res));
              console.log('ffff ')
                if(this.preferredBank.length){
                  for (const record of JSON.parse(JSON.stringify(res))) {
                    var name={
                      userid:record.userid,
                      bankName:record.bankName
                    }
                    this.pbSelection.push(name);
                  }
                  this.kycForm.patchValue({                  
                   preferredBanks:this.pbSelection
                  });
                }else{
                  this.loadBankList();
                  
                }

            
})

  }
  loadBankList() {


this.service.bankList().subscribe((res)=>{
 // this.bankList = res; 
  this.countryList=res;
  let item = {bankName: "All", userid: "All"}
  //this.countryList.push(item);
 // this.countryList.unshift(item);
  this.selectedcountry=res;
  for (var entry of this.countryList) {   
    var d={
      userid:entry.userid,
      bankName:entry.bankName
    }

     if(entry.bankName)
      this.preferredBanks.push(d);
  }
 })

  }


  closeDialog() {
    return this.dialogRef.close({ result: true });
  }


  loadKycDetails() {


    this.userId=this.data.id
  this.isCustomer=this.userId.startsWith('CU');
    this.service.kycDetail(this.data.id).subscribe(
      (res) => {
        this.resData = res;
        this.kycData = this.kycForm.get('kycData') as FormArray;
        this.resData.forEach(element => {
          let aaaa = this.fb.group({
            kycid: [element.kycid],
            kycType: [element.kycType],
            kycStatus: [element.kycStatus],
            encodedFileContent: [element.encodedFileContent],
            docType: [element.docType],
            docName: [element.docName],
            country: [element.country],
            reason: [element.reason],
            userid: [element.userid],
            checkerComment: [element.checkerComment],
            makerComment: [element.reason]
          });
          this.kycData.push(aaaa);
        });

      });
      if(this.isCustomer || this.userId.startsWith('BC')){
        this.loadViewPreferredBank();
      const data={
        "userId":this.data.id
      }
      this.service.viewFieldData(data).subscribe(
        (res) => {
          let data = JSON.parse(JSON.stringify(res)).data;
          this.filedId=data.id;
          this.kycForm.patchValue({
            custTurnover: data.custTurnover,
            importVolume:data.importVolume,
            exportVolume: data.exportVolume,
            yearlyLCVolume: data.yearlyLCVolume,
           usedLCIssuance :data.usedLCIssuance,
           preferredBanks:this.pbSelection
          });
     
    });
  }
  }


  financialAction() {
    
    this.sharedUtilService.showSnackBarMessage('you have successfully saved financial data');
    

  }

  kycAction(status, item) {
    let message;
    if(status=='Approved'){
      message = 'Are you sure you want to ' + 'Approve' + ' the KYC Document?';
    }
    else if(status=='Rejected'){
      message = 'Are you sure you want to ' + 'Reject' + ' the KYC Document?';
  }
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '45%',
      height: '30%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      if (dialogResult) {
        const reqData = {
          'kycid': item.controls['kycid'].value,
          'reason': item.controls['reason'].value,
          'comment':item.controls['reason'].value,
          'kycStatus': 'Maker '+status,
          'approverName': localStorage.getItem('nimaiId'),
          'userId':this.userId
        };
        this.service.kycStatusUpdate(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            item.get('kycStatus').setValue('Maker '+status);
            // this.loadKycDetails();
            // this.router.navigate(['app', 'transactions', 'transactions-list']);
          });
      }
    });

  }

  showImage(imgData){    
    // const base64Content = imgData;
    // let base64ContentArray = base64Content.split(",")     
    // let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0]
    // let base64Data = base64ContentArray[1]
    // if(mimeType=="image/png" || mimeType=="application/pdf"){
    //   console.log("If------>",mimeType)
    //   this.showLink=true;
    // }else{
    //   this.showLink=false;
    // }
    const dialogRef = this.dialog.open(ShowImageComponent, {
      width: '50%',
      height: '75%',
      data: { title: 'KYC Document', image: imgData},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadCustomerList();
    });
  }
           

  saveFinancial(status){
this.pbSelection=[];
for(let data of this.kycForm.get('preferredBanks').value){
   this.pbSelection.push(data.userid)
}
   const data= {
      "userId": this.userId,
    "custTurnover":this.kycForm.get('custTurnover').value,
    "importVolume":this.kycForm.get('importVolume').value,
    "exportVolume":this.kycForm.get('exportVolume').value,  
    "yearlyLCVolume":this.kycForm.get('yearlyLCVolume').value,    
    "usedLCIssuance":this.kycForm.get('usedLCIssuance').value,   
    //"preferredBanks":this.kycForm.get('preferredBanks').value,
    "id":this.filedId  
  }
  this.service.saveFieldData(data).subscribe(
    (res) => {
      this.sharedUtilService.showSnackBarMessage('you have successfully saved financial data');
    });
  if(this.kycForm.get('preferredBanks').value){
    const param={
      "custUserId": this.userId,
      "banks": this.pbSelection
    }
    console.log(param)

this.service.savePreferredBank(param).subscribe((res)=>{
  this.sharedUtilService.showSnackBarMessage('Preferred banks assigned succefully!');

})
  }
  }

  closeNone(){
    this.kycForm.get('preferredBanks').setValue('');
    this.disabledOther=false
  }
  onKey(value) { 
    this.selectedcountry = this.search(value);    
     }
     search(value: string) { 
       let filter = value.toLowerCase();
       return this.countryList.filter(option => option.bankName.toLowerCase().startsWith(filter));
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
