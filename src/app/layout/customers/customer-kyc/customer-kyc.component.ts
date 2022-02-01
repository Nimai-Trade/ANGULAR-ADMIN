import { Component, OnInit, Inject } from '@angular/core';
import { BanksService } from '../../banks/banks.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';

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
  preferredBanks: any = [];
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
      idField: 'bankName',
      textField: 'bankName',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll:false,
      autoPosition: false
    };
  }
 

  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.empCode = localStorage.getItem('nimaiId');
    this.loadKycDetails();
    this.loadBankList();
   
  }

  loadViewPreferredBank() {
   const data= {
      "custUserId": this.userId
    }
this.service.viewPreferredBank(data).subscribe((res)=>{
              this.preferredBank = JSON.parse(JSON.stringify(res));
                
                  for (const record of JSON.parse(JSON.stringify(res))) {
                    this.pbSelection.push(record.userid);
                  }
                  this.kycForm.patchValue({                  
                   preferredBanks:this.pbSelection
                  });
                  this.loadBankList()
            
})

  }
  loadBankList() {

this.service.bankList().subscribe((res)=>{
  this.bankList = res; 
  this.countryList=res;
  // let item = {bankName: "All", userid: "All"}
  // this.countryList.push(item);
  // this.countryList.unshift(item);
//   this.selectedcountry=res;
//   for (let entry of this.countryList) {
//     if(entry.bankName)
//     this.preferredBanks.push(entry.bankName);
//   }
//   console.log(this.preferredBanks)

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

    //console.log(this.kycData);
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
    console.log("userId",this.userId)
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

   const data= {
      "userId": this.userId,
    "custTurnover":this.kycForm.get('custTurnover').value,
    "importVolume":this.kycForm.get('importVolume').value,
    "exportVolume":this.kycForm.get('exportVolume').value,  
    "yearlyLCVolume":this.kycForm.get('yearlyLCVolume').value,    
    "usedLCIssuance":this.kycForm.get('usedLCIssuance').value,   
    "preferredBanks":this.kycForm.get('preferredBanks').value,
    "id":this.filedId  
  }
  this.service.saveFieldData(data).subscribe(
    (res) => {
      this.sharedUtilService.showSnackBarMessage('you have successfully saved financial data');
    });
  if(this.kycForm.get('preferredBanks').value){
    const param={
      "custUserId": this.userId,
      "banks": this.kycForm.get('preferredBanks').value
    }
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
