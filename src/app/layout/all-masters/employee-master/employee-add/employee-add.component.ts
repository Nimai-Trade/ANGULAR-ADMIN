import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { AllMasterService } from '../../all-masters.service';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})

export class EmployeeAddComponent implements OnInit {
  @ViewChild('selectList') selectList: ElementRef;
  public mulObj: MultiSelectComponent;
  selectedItems: any;
  dropdownSettings = {};
  selectedIndex = 0;
  employeeForm: any;
  employeeData: any;
  statusList: any;
  loading = false;
  submitted: boolean = false;
  countryList: any = [];
  countryData:any=[];
  roleList: any;
  countrySelection: any = [];
  country: any = [];
  countryCode: any = [];
  public value1: [];
  mobNumberPattern = '/^[6-9]\d{9}$/';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$';
  localWaterMark: any;
  localFields: any;
  roleInfo: any[];
  roleSelection: any = [];
  disabledOther: boolean=false;
  isOptionNone: boolean=false;
  items: any;
  selectedcountry: any=[];
  constructor(private fb: FormBuilder, private service: AllMasterService, public dialogRef: MatDialogRef<EmployeeAddComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.employeeForm = fb.group({
      empId: [],
      empCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      empMobile: ['', Validators.compose([
        Validators.required
        // Validators.pattern(/^[6-9]\d{9}$/)
      ])],
      // empEmail: ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern(this.emailPattern)
      // ])],
      empEmail: ['', Validators.compose([
          Validators.required,
          Validators.pattern(this.emailPattern)
        ])],
      empRole: [, Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      reportingManager: [],
      status: ['ACTIVE', Validators.required],
      country: [, Validators.required],
      countryExt: [, Validators.required]
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'country',
      textField: 'country',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll:false,
      autoPosition: false
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
    };
  }
  ngOnInit() {
    this.statusList = [{ 'code': 'ACTIVE', 'name': 'ACTIVE' }, { 'code': 'INACTIVE', 'name': 'INACTIVE' }];
    if (this.data.id) {
      this.loadEmployeeDetails();
    } else {
      this.employeeData = '';
      this.getCountryList();
      this.getCode();
    }

    this.getroleList();
  }

  checkEmailPatter(value) {
  }


  closeDialog() {
    return this.dialogRef.close({ result: true });
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }


  onSubmitEmployee() {  
    this.submitted = true;
    if (this.employeeForm.valid) {
      this.service.saveEmployeeDetails(this.employeeForm.value).subscribe((res) => this.onSuccess(res));
      this.submitted = false;
    } else {
      this.validateAllFormFields(this.employeeForm);

    }
  }


  validateAllFormFields(employeeForm: FormGroup) {
    Object.keys(employeeForm.controls).forEach(field => {
      const control = employeeForm.get(field);
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
    return !this.employeeForm.get(field).valid && this.employeeForm.get(field).touched;
  }


  async onSuccess(res) {    
    if (res.flag === 'NEW') {
      const req = {
        "event": "ACCOUNT_ACTIVATE",
        "email": res.empEmail,
        "userName": res.empName,
        "userId": res.empCode,
        "empCode":res.empCode
      //  "link": res.link
      }
      await this.service.sendActivationLink(req).subscribe((res));
    }
    this.sharedUtilService.showSnackBarMessage(res.message);
    this.closeDialog();
  }
  
  closeNone(){
    this.employeeForm.get('country').setValue('');
    this.disabledOther=false
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
  loadEmployeeDetails() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.countryList = res;     
        for (let entry of this.countryList) {
          this.country.push(entry.country);
          if(entry.country!="All")
            this.countryCode.push(entry.code);
        }

        this.service.getEmployeeDetailsById(this.data.id).subscribe(
          (res) => {
            // this.getCountryList();
            this.employeeData = res;
            this.roleInfo = res['roleInfo'];
            if (this.roleInfo != null) {
              for (const record of this.roleInfo) {
                this.roleSelection.push(record.roleId);
              }
            }
            Object.keys(res).forEach(name => {
             
              if (this.employeeForm.controls[name]) {
                if(name=="country"){
                  if(res['country']=="All"){
                    this.disabledOther=true;  
                    this.selectedItems = [ 'All'];
                  }
                } 
                if (name != 'empRole') {
                  this.employeeForm.controls[name].patchValue(res[name]);
                } else {
                  this.employeeForm.controls['empRole'].patchValue(this.roleSelection);
                }
              }
            });


          });
      });
  }
  getCode() {
    this.service.getCountryList().subscribe(
      (res) => {
        this.selectedcountry=res;
        });
    }

  getCountryList() {
    this.service.getCountryList().subscribe(
      (res) => {
        
        this.countryList = res;
        let item = {country: "All", code: "All"}
        this.countryList.push(item);
        this.countryList.unshift(item);
        for (let entry of this.countryList) {
          this.country.push(entry.country);
        //   if(entry.country!="All")
        //     this.countryCode.push(entry.code);
         }
       
      });
  }
  onChangeofOptions(newGov) {
    console.log(newGov);
 }



 onKey(value) { 
 this.selectedcountry = this.search(value);
 
  }
  search(value: string) { 
    let filter = value;
    return this.countryList.filter(option => option.code.startsWith(filter));
  }


 filterItem(event){
     if(!event){
         this.items = this.countryList;
     } // when nothing has typed*/   
     if (typeof event === 'string') {
         this.items = this.countryList.filter(a => a.toLowerCase()
                                            .startsWith(event.toLowerCase())); 
     }
  //   console.log(this.items.length);
     this.selectList.nativeElement.size = this.items.length + 1 ;       
  }   
  getroleList() {
    this.service.getRoleDataList().subscribe(
      (res) => {
        this.roleList = res;
      });
  }

  checkAlreadyExists(value) {
    if (value && value != this.employeeData.empCode) {
      this.service.checkEmployeeCode(value).subscribe(
        (res) => {
          if (res) {
            this.employeeForm['controls'].empCode.setErrors({ 'isExits': true });
          }
        });
    }
  }


}
