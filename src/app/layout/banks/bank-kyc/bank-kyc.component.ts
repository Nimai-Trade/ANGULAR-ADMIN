import { Component, OnInit, Inject } from '@angular/core';
import { BanksService } from '../banks.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ShowImageComponent } from 'src/app/shared/show-image/show-image.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { CustomerKycComponent } from '../../customers/customer-kyc/customer-kyc.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';

@Component({
  selector: 'app-bank-kyc',
  templateUrl: './bank-kyc.component.html',
  styleUrls: ['./bank-kyc.component.scss']
})
export class BankKycComponent implements OnInit {
  kycData: FormArray;
  ratingForm:any;
  kycForm: any;
  resData: any;
  result = '';
  rightList : any;
  myRights : any;
  message:any;
  userId:any;
  empCode:any;
  ranking: any

  errMsg: boolean;
  rating: string;
  subRate: string;
  agencys: Object;
  ratingLists: Object;
  constructor(private fb: FormBuilder, private service: BanksService, private dialog: MatDialog, public dialogRef: MatDialogRef<BankKycComponent>, @Inject(MAT_DIALOG_DATA) public data, public sharedUtilService: SharedUtilService) {
    this.kycForm = fb.group({
      kycData: this.fb.array([]),
    });
    this.ratingForm=this.fb.group({
      rating:[''],
      subRate:['']
    })
  }


  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.empCode = localStorage.getItem('nimaiId');
    this.loadKycDetails();


  }

  onChangeType(e:any){
   const data= {
      "agency":this.ratingForm.get('rating').value
  }
  
    this.service.getMasterRating(data).subscribe(
      (res) => {
this.ratingLists=res
      })
}


  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  loadKycDetails() {

    this.service.getAgency(this.data.id).subscribe(
      (res) => {
       this.agencys=res
      })   

  
    this.userId=this.data.id
    this.service.kycDetail(this.data.id).subscribe(
      (res) => {
        const data=
        {
          "bankUserid": this.data.id
        }    
        var str="";
       this.service.viewBankRating(data).subscribe((res)=>{
        this.ranking=JSON.parse(JSON.stringify(res)).data.rating;
         str=this.ranking.split(" : ",2)


        var rate="";
        if(this.ratingForm.get('rating').value){
          rate=this.ratingForm.get('rating').value
        }else{
        rate=str[0]
        }
        console.log(this.ratingForm.get('rating').value)
              const datas= {
                "agency":rate
            }
            
              this.service.getMasterRating(datas).subscribe(
                (res) => {
          this.ratingLists=res
                })

       // this.ratingForm.controls['rating'].patchValue(this.ranking);
        this.ratingForm.patchValue({
          rating: str[0],
          subRate: str[1],
        })
       })
     //  this.onChangeType();
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
            makerComment:[element.reason],
            checkerComment:[element.checkerComment],
           // rating:[this.ranking]
          //  rating: str[0],
          //  subRate: str[1]
          });


          this.kycData.push(aaaa);
          // this.ratingForm.patchValue({
          //   rating: str[0],
          //   subRate: str[1],
          // })
        });
        console.log(this.kycData);
        console.log(this.ratingForm.value);
      });
  }
  financialAction() {
    
    this.sharedUtilService.showSnackBarMessage('you have successfully saved Rank');
  
  }
  saveRating(){
  console.log(this.ratingForm.get('rating').value)
  console.log(this.ratingForm.get('subRate').value)
  if(!this.ratingForm.get('rating').value){
this.errMsg=true;
return
  }
  if(!this.ratingForm.get('subRate').value){
    this.errMsg=true;
    return
  }
  this.errMsg=false;
    const data=
    {
      "bankUserid": this.data.id,
	        "rating": this.ratingForm.controls['rating'].value +" : "+this.ratingForm.controls['subRate'].value
    }

   this.service.saveBankRating(data).subscribe((res)=>{
    this.financialAction();
     })
  }

  kycAction(status, item) {
    console.log('status ' + status + ' id ' + item.controls['kycid'].value);
    console.log(item.controls['reason'].value);
     

    if(status=='Approved'){
      this.message = 'Are you sure you want to ' + 'Approve' + ' the KYC Document?';
    }
    else if(status=='Rejected'){
      this.message = 'Are you sure you want to ' + 'Reject' + ' the KYC Document?';
  }

    const dialogData = new ConfirmDialogModel('Confirm Action', this.message);
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
          'approverName': localStorage.getItem('nimaiId')
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
    console.log(imgData);
    // alert(imgData);
    const dialogRef = this.dialog.open(ShowImageComponent, {
      width: '50%',
      height: '75%',
      data: { title: 'KYC Document', image: imgData },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.loadCustomerList();
    });
  }
}