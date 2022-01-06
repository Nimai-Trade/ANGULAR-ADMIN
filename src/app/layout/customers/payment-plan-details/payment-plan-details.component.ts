import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationCommentDialogComponent } from 'src/app/shared/confirmation-comment-dialog/confirmation-comment-dialog.component';
import { ConfirmationDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { BanksService } from '../../banks/banks.service';

@Component({
  selector: 'app-payment-plan-details',
  templateUrl: './payment-plan-details.component.html',
  styleUrls: ['./payment-plan-details.component.scss']
})
export class PaymentPlanDetailsComponent implements OnInit {

  paymentData: any;
  result = '';
  rightList : any;
  myRights : any;
  reqData:any;
  vasLists: any[]=[];
  showBtn: boolean=false;
  vasIds: any="";

  showSubsidiary:boolean=true;
  empCode:any
  constructor(private service: BanksService, private dialog: MatDialog, public dialogRef: MatDialogRef<PaymentPlanDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data, public sharedUtilService: SharedUtilService) { }


  ngOnInit() {
    this.rightList = localStorage.getItem('userRight');
    this.myRights = this.rightList.split(',');
    this.empCode = localStorage.getItem('nimaiId');    
    this.loadPaymentDetail();
  }


  closeDialog() {
    return this.dialogRef.close({ result: true });
  }
  loadPaymentDetail() {
    this.service.planOfPaymentDetail(this.data.id).subscribe(
      (res) => {
        this.paymentData = res;

for(var i=0;i<this.paymentData.length;i++){
  for(var j=0;j<this.paymentData[i].vasList.length;j++){
   if(this.paymentData[i].isMultipleVasApplied=="1")
    this.vasLists.push(this.paymentData[i].vasList[j])
   
    if(this.paymentData[i].vasList[j].vasStatus=="Active"){
      this.vasIds= this.vasIds+ this.paymentData[i].vasList[j].vasId+"-";
    }   

    if(this.paymentData[i].vasList[j].vasStatus === 'Active' && this.paymentData[i].vasList[j].vasPlanPaymentMode === 'Wire'
     && this.paymentData[i].vasList[j].vasPaymentStatus === 'Pending'
     && this.paymentData[i].paymentStatus=='Approved'  && this.paymentData[i].isSplanWithVasFlag==0)
     {
      this.showBtn=true;
     }
    
    }
}

      
        // this.vasLists.forEach(element => {
        //   if(this.paymentData.isMultipleVasApplied=="1"){
        //     this.showBtn=true;
        //     this.vasIds= this.vasIds+element.vasId+"-";
        //   }          
         
      //   });

      console.log("this.vasIds",this.vasIds);
        if(!this.paymentData[0].userid.startsWith('BC')){
          this.showSubsidiary=true;
        }else{
          this.showSubsidiary=false;
        }
       
      });
  }
  paymentAction(status, item , action){
  
  console.log('status ' + status + ' id ' + item.userid);
    let msgStatus=""
    if(status==="Approved"){
      msgStatus="Approve"
    }else{
      msgStatus="Reject"
    }
    const message = 'Are you sure you want to ' + msgStatus + ' the Payment?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationCommentDialogComponent, {
      width: '50%',
      height: '45%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      let updateStatus = '';
      console.log(dialogResult)
      if (dialogResult) {
     this.vasIds=this.vasIds.slice(0,-1);
        if(action=="vasAction"){
          this.reqData = {
            'userId': item.userid,
            'status': status === "Approved" ? 'Maker Approved': status,
            'vasNUmber': this.vasIds,
            'vasMakerComment': this.result['data'],
            'comment':this.result['data']
          };
        }else{
          this.reqData = {
            'userId': item.userid,
            'status': status === "Approved" ? 'Maker Approved': status,
            'subcriptionId': item.splSerialNumber,
            'makerComment': this.result['data'],
            'comment':this.result['data']
          };
        }
        
        this.service.updatePaymentStatus(this.reqData).subscribe(
          (res) => {
           
            this.sharedUtilService.showSnackBarMessage(res['message']);
            // item.get('paymentStatus').setValue('Maker '+status);
            this.loadPaymentDetail();
          }, (error) => {
           // console.log("res---",error)
            this.sharedUtilService.showSnackBarMessage(error.error.message);
            
          });
      }
    });

  }
}
