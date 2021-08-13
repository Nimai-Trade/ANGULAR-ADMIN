import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {

  imgData: any;
  otherImgTypeData:any; 
  mimeType:any;
  extension:any;
  constructor(private sanitizer: DomSanitizer,public dialogRef: MatDialogRef<ShowImageComponent>,
     @Inject(MAT_DIALOG_DATA) public data) { 
       const base64Content = this.data.image;
       let base64ContentArray = base64Content.split(",")     
       let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0] 
      // console.log("base64Content--",base64Content)   
     //  console.log("mimeType----",mimeType)
       if(mimeType!=="image/jpeg" && mimeType!=="image/png"){
      //  console.log("if") 
        this.otherImgTypeData=this.data.image;
        this.mimeType=mimeType;
       } else{
        //console.log("else") 
        this.imgData=this.data.image;
        this.mimeType=mimeType;
       } 
      console.log("mimeType--",this.mimeType)
     }
  ngOnInit() {    
  //  this.loadImageDetail();
  }
 
  downloadImage(b64Data,mimeType){
  //  console.log("downloadImage--",b64Data)
    // var data = new Blob([img], { type: 'application/pdf' });
    // FileSaver.saveAs(data, 'a.pdf');
    let fileName="KycDoc"
    var sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    var byteCharacters = window.atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: mimeType});
    if(mimeType=="application/pdf"){
      this.extension=".pdf"
    }else if(mimeType=="application/excel" || mimeType=="application/vnd.ms-excel" || mimeType=="application/x-excel" || mimeType=="application/x-msexcel"){
      this.extension=".xls"
    }else if(mimeType=="image/png"){
      this.extension=".png"
    }else if(mimeType=="application/msword"){
      this.extension=".doc"
    }
    const file = new File([blob], fileName + "_" + new Date().getTime() + '' +this.extension, { type: mimeType });
    saveAs(file);
  }
  
  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
 // loadImageDetail() {
    // this.service.getEmployeeDetailsById(this.data.id).subscribe(
    //   (res) => {
    //     this.employeeData = res;
    //   });
  //}
}
