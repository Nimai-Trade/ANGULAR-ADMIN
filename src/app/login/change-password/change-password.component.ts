import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatDialog } from '@angular/material';
import { SharedUtilService } from 'src/app/shared/services/shared-util';
import { MustMatch } from 'src/app/beans/Validations';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  changePasswordForm: any;
  userId: any;
  token: any;
  minPw = 8;
  passwordHide: boolean = true;
  confirmPassHide: boolean = true;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private service: LoginService, public dialog: MatDialog, public sharedUtilService: SharedUtilService) {
    this.changePasswordForm = fb.group({
      newPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z\d$@#$!%*?&].{7,20}')]],
      confirmPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z\d$@#$!%*?&].{7,20}')]],
    },
    {
      validators: MustMatch('newPassword', 'confirmPassword')
    }
    );
    this.passwordHide = true;
    this.confirmPassHide = true;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    });
    // console.log('userId ' + this.userId + ' && token ' + this.token);
  }

  onSubmitPassword() {
    console.log('On submit password------->',this.changePasswordForm);
    if (this.changePasswordForm.invalid) {
      return;
    }
    const reqData = {
      'username': this.userId,
      'token': this.token,
      'newPassword': this.changePasswordForm.controls['newPassword'].value,
      'confirmPassword': this.changePasswordForm.controls['confirmPassword'].value
    };
    this.service.setNewPassword(reqData).subscribe(
      (res) => {
        this.sharedUtilService.showSnackBarMessage(res['message']);
        if (res['success'])
          this.router.navigate(['/']);
      }, (error) => {
            if(error.error.message=="Invalid Token or Date")
              this.sharedUtilService.showSnackBarMessage("The validity of the link has expired. Please contact 360tf Customer support team for further assistance.");
            else   
              this.sharedUtilService.showSnackBarMessage(error.error.message);
             
           });
    // if (this.changePasswordForm.valid) {
    //   if (this.changePasswordForm.controls['newPassword'].value === this.changePasswordForm.controls['confirmPassword'].value) {
    //     console.log("If not matched")
    //     const reqData = {
    //       'username': this.userId,
    //       'token': this.token,
    //       'newPassword': this.changePasswordForm.controls['newPassword'].value,
    //       'confirmPassword': this.changePasswordForm.controls['confirmPassword'].value
    //     };
    //     this.service.setNewPassword(reqData).subscribe(
    //       (res) => {
    //         this.sharedUtilService.showSnackBarMessage(res['message']);
    //         if (res['success'])
    //           this.router.navigate(['/']);
    //       });
    //   } else {
    //    // this.changePasswordForm['controls'].confirmPassword.setErrors({ 'pwdsDontMatch': true });
    //     console.log("not matched")
    //   }
    // } else {
    //   this.validateAllFormFields(this.changePasswordForm);
    // }
  }

  validateAllFormFields(changePasswordForm: FormGroup) {
    
    Object.keys(changePasswordForm.controls).forEach(field => {
      const control = changePasswordForm.get(field);
      // console.log(control);
      if (control instanceof FormControl) {
        console.log("IF");
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        console.log("ELSE");
        this.validateAllFormFields(control);
      }
    });
  }

}
