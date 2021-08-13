import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { ChangePasswordService } from '../change-password.service';
import { overLappingIssue } from 'src/assets/js/validation.js'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm : any;
  userId: any;
  token: any;
  minPw = 8;
  oldPassHide: boolean = true;
  passwordHide: boolean = true;
  confirmPassHide: boolean = true;
  role:any;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private service: ChangePasswordService, private cdr: ChangeDetectorRef, private dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.changePasswordForm = formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z\d$@#$!%*?&].{7,20}')]],
      confirmPassword: ['', Validators.required]
    });
    this.passwordHide = true;
    this.confirmPassHide = true;
    this.oldPassHide = true;
  }

  ngOnInit() {
    overLappingIssue();
    this.userId = localStorage.getItem('nimaiId');
  }
  close() {
    this.role = localStorage.getItem('role');
    if (this.role === 'Bank RM') {
      this.router.navigate(['app', 'dashboard', 'bank-rm']);
    } else if (this.role === 'Customer RM'){
      this.router.navigate(['app', 'dashboard', 'cust-rm']);
    } else if (this.role === 'Management'){
      this.router.navigate(['app', 'dashboard', 'management']);
    } else if (this.role === 'Ops Admin'){
      this.router.navigate(['app', 'dashboard', 'ops-admin']);
    } else if (this.role === 'Ops Edit'){
      this.router.navigate(['app', 'dashboard', 'ops-edit']);
    } else {
      this.router.navigate(['app', 'dashboard', 'ops-edit']);
    }

  }

  onSubmitPassword() {
    console.log('On submit password');
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.controls['newPassword'].value === this.changePasswordForm.controls['confirmPassword'].value) {
        const reqData = {
          'username': this.userId,
          'oldPassword':this.changePasswordForm.controls['oldPassword'].value,
          'newPassword': this.changePasswordForm.controls['newPassword'].value,
          'confirmPassword': this.changePasswordForm.controls['confirmPassword'].value
        };
        this.service.setNewPassword(reqData).subscribe(
          (res) => {
            this.sharedUtilService.showSnackBarMessage(res['message']);
            console.log("res[success]--",res['success'])
            if (res['success']==true){           
              // this.router.navigate(['/app/change-password']);
              this.role = localStorage.getItem('role');
              console.log("thus.role---",this.role)
            if (this.role === 'Bank RM') {
              this.router.navigate(['app', 'dashboard', 'bank-rm']);
            } else if (this.role === 'Customer RM'){
              this.router.navigate(['app', 'dashboard', 'cust-rm']);
            } else if (this.role === 'Management'){
              this.router.navigate(['app', 'dashboard', 'management']);
            } else if (this.role === 'Ops Admin'){
              this.router.navigate(['app', 'dashboard', 'ops-admin']);
            } else if (this.role === 'Ops Edit'){
              this.router.navigate(['app', 'dashboard', 'ops-edit']);
            } else {
              this.router.navigate(['app', 'dashboard', 'ops-edit']);
            }
          }else{

          }
          });
      } else {
        this.changePasswordForm['controls'].confirmPassword.setErrors({ 'pwdsDontMatch': true });
      }
    } else {
      this.validateAllFormFields(this.changePasswordForm);
    }
  }

  validateAllFormFields(changePasswordForm: FormGroup) {
    console.log(changePasswordForm.value);
    Object.keys(changePasswordForm.controls).forEach(field => {
      const control = changePasswordForm.get(field);
      // console.log(control);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
