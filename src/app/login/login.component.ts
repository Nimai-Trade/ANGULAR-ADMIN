import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { LoginService } from './login.service';
import { SelectDepartmentComponent } from './select-department/select-department.component';
import { CookieService } from 'ngx-cookie-service';
import { SharedUtilService } from '../shared/services/shared-util';
import * as $ from '../../assets/js/jquery.min';
import { overLappingIssue } from 'src/assets/js/validation.js'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    forgotPasswordForm: FormGroup;
    loginMsg: any;
    forgPassSubmitted: boolean = false;
    hide: boolean = true;
    captchaError: boolean = false;
    captchaToken:any;
    constructor(private fb: FormBuilder, private router: Router, private service: LoginService, public dialog: MatDialog, private cookie: CookieService, public sharedUtilService: SharedUtilService) {
        this.loginForm = this.fb.group({
            userName: [, Validators.required],
            password: [, Validators.required],
            recaptchaReactive:[, Validators.required],
            email: []
        })
        this.hide = true;
        this.cookie.set('Test', 'Hello World');

    }

    ngOnInit() {
        overLappingIssue();
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('jwtToken');
        // sessionStorage.removeItem('jwtToken');
        localStorage.removeItem('userRight');

        this.forgotPasswordForm = this.fb.group({
            //email: ['', [Validators.required, Validators.email]]
            empCode: ['', Validators.required],
            recaptchaReactive:[, Validators.required]
        })
    }
    resolved(event){    
        this.captchaToken=event;
      }
      validate() {
        this.loginForm.get('userName').setValidators(Validators.required);
        this.loginForm.get('password').setValidators(Validators.required);
        this.loginForm.get('userName').updateValueAndValidity();
        this.loginForm.get('password').updateValueAndValidity();
        this.loginForm.get('recaptchaReactive').setValidators(Validators.required);
        this.loginForm.get('recaptchaReactive').updateValueAndValidity();
        
      }
      Removevalidate() {
        this.loginForm.get('userName').clearValidators();
        this.loginForm.get('password').clearValidators();
        this.forgotPasswordForm.get('empCode').clearValidators();
        this.forgotPasswordForm.get('empCode').updateValueAndValidity();
        this.loginForm.get('userName').updateValueAndValidity();
        this.loginForm.get('password').updateValueAndValidity();
        this.loginForm.get('recaptchaReactive').clearValidators();
        this.loginForm.get('recaptchaReactive').updateValueAndValidity();
      
    }
  
    submit() {
        this.validate()
        console.log("submit--",this.loginForm.valid)
        const response = this.captchaToken;
        console.log("token --",this.captchaToken)
      
        if (this.loginForm.valid) {
            let data={
                username:this.loginForm.value.userName,
                recaptchaResponse:this.loginForm.get('recaptchaReactive').value,
                password:this.loginForm.value.password
            }
            this.service.login(data).subscribe(
                (res) => {
                    this.Removevalidate();
                    localStorage.setItem('jwtToken', res.accessToken);
                    // sessionStorage.setItem('jwtToken', res.accessToken);
                    if(res.accessToken){
                        this.service.validateUser(this.loginForm.value.userName).subscribe(
                        (res) => {
                            localStorage.setItem('isLoggedin', 'true');
                            localStorage.setItem('userInfo', res.data.name + ' (' + res.data.username + ')');
                            localStorage.setItem('nimaiId', res.data.username);
                            if(res.message==="Valid user"){
                                if (res.data.role.length === 1) {
                                    this.service.getUserRights(res.data.username, res.data.role[0]).subscribe(
                                        (resp) => {
                                            localStorage.setItem('role', res.data.role[0]);
                                            localStorage.setItem('userRight', resp.data);
                                            this.router.navigate(['/app']);
                                        });
                                } else {
                                    this.openDepartmentDialog(res.data.username, res.data.role);
                                }
                            }else{
                                this.loginMsg=res.message;
                            }
                        },
                        (err) => {  
                            if(err.error.error)
                                this.loginMsg = err.error.error;
                            else
                                this.loginMsg = "Unauthorize Access"; 
                            this.loginForm['controls'].password.setErrors({ 'invalidCred': true });
                        }
                        );
                    }
                },
                (err) => {
                   console.log("errr--",err.status)
                   if (err.status === 500 ) {
                    this.loginMsg = 'Please enter valid username or password';
                   }else if(err.status === 400){
                        if(typeof(err.error)!=="object"){
                            this.loginMsg = 'Please enter valid username or password';//err.error;
                        }
                        else    
                        {
                            this.loginMsg = err.error.message;
                        }
                   }else if (err.status === 401){
                        this.loginMsg = 'Please enter valid username or password';
                   }else{
                        this.loginMsg = 'Error due to some technical issue.';
                   }
                   this.loginForm.get('recaptchaReactive').setValue(null);
                    this.loginForm['controls'].password.setErrors({ 'invalidCred': true });
                   
                }
            );
        } else {

            this.validateAllFormFields(this.loginForm);
        }
    }

    openDepartmentDialog(empCode, role): void {
        const dialogRef = this.dialog.open(SelectDepartmentComponent, {
            width: '40%',
            height: '40%',
            data: { title: 'Select Role', role: role },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            this.service.getUserRights(empCode, result.role).subscribe(
                (resp) => {
                    localStorage.setItem('role', result.role);
                    localStorage.setItem('userRight', resp.data);
                    this.router.navigate(['/app']);
                });
        });
    }

    validateAllFormFields(loginForm: FormGroup) {
        Object.keys(loginForm.controls).forEach(field => {
            const control = loginForm.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    forgotPassword(): void {
        this.forgPassSubmitted = true;
        this.forPassValidate();
       
        if (this.forgotPasswordForm.valid) {
            this.forgPassSubmitted = false;
            const fg = {
               // 'username': this.forgotPasswordForm.get('email').value,
               'recaptchaResponse':this.forgotPasswordForm.get('recaptchaReactive').value,
               'empCode': this.forgotPasswordForm.get('empCode').value,
            };
            this.service.sendForgetPasswordEmail(fg)
                .subscribe((res) => {
                    const req = {
                        'event': 'FORGOT_PASSWORD',
                        //'email': res.empEmail,
                        'userName': res.empName,
                         'empCode':res.empCode,
                        'userId': res.empCode,
                       //'link': res.link
                    };
                    // let emailValue = this.forgotPasswordForm.get('email').value;
                    this.service.sendActivationLink(req).subscribe((res));
                    this.Removevalidate();
                    $('#ForgotPassworddiv').slideUp();
                    $('#logindiv').slideDown();
                    this.sharedUtilService.showSnackBarMessage('Password reset link sent on your register email Id...');
                    this.forgotPasswordForm.reset();

                },
                    (error) => {
                    let responserror = JSON.parse(JSON.stringify(error));
                    if(responserror.error.message)
                        this.sharedUtilService.showSnackBarMessage(responserror.error.message);
                    else  
                        this.sharedUtilService.showSnackBarMessage(responserror.error);

                    }
                );
        } else {
            // if (this.forgotPasswordForm.get('email').value === '' || this.forgotPasswordForm.get('email').value === undefined)
            //     this.validateAllFormFields(this.forgotPasswordForm);
            // else
            //     this.forgotPasswordForm['controls'].email.setErrors({ 'invalidEmail': true });
            if (this.forgotPasswordForm.get('empCode').value === '' || this.forgotPasswordForm.get('empCode').value === undefined)
                this.validateAllFormFields(this.forgotPasswordForm);
           
        }

    }


    forPassValidate() {
        // this.forgotPasswordForm.get('email').setValidators([Validators.required, Validators.email]);
        // this.forgotPasswordForm.get('email').updateValueAndValidity();
    this.forgotPasswordForm.get('empCode').setValidators(Validators.required);
    this.forgotPasswordForm.get('empCode').updateValueAndValidity();
    this.forgotPasswordForm.get('recaptchaReactive').setValidators(Validators.required);
    this.forgotPasswordForm.get('recaptchaReactive').updateValueAndValidity();
    }

    returnToLogin() {
        $('#ForgotPassworddiv').slideUp();
        $('#logindiv').slideDown();
        this.Removevalidate()
        this.forgotPasswordForm.reset();
    }
    forgotPasswordLink() {
        $('#logindiv').slideUp();
        $('#ForgotPassworddiv').slideDown();
        this.loginForm.reset();
        this.Removevalidate()
        
    }
   
}
