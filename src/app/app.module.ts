import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { SelectDepartmentComponent } from './login/select-department/select-department.component';
import { MaterialModule } from './shared/material-module/material.module';
import { HttpRequestInterceptor } from './shared/services/http.interceptor';
import { SharedUtilService } from './shared/services/shared-util';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CookieService } from 'ngx-cookie-service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { BnNgIdleService } from 'bn-ng-idle';

import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { LoaderInterceptorService } from './shared/services/interceptors/loader-interceptor.service';
import { LoaderServiceService } from './shared/services/loader/loader-service.service';
import { LoaderComponent } from './shared/loader/loader.component';
export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent, LoginComponent, SelectDepartmentComponent, ChangePasswordComponent,LoaderComponent],
    imports: [
        BrowserModule,
        DateRangePickerModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        // FlexLayoutModule.withConfig({ addFlexToParent: false }),
        FlexLayoutModule,
        HttpClientModule,
        MaterialModule,
        RecaptchaModule,  //this is the recaptcha main module
        RecaptchaFormsModule, //this is the module for form incase form validation
        TimePickerModule,        
         Ng4LoadingSpinnerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    entryComponents: [SelectDepartmentComponent],
    providers: [BnNgIdleService,SharedUtilService, LoginService, LoaderServiceService, CookieService, 
        {
            provide: HTTP_INTERCEPTORS,
           // useClass: HttpRequestInterceptor,
           useClass:LoaderInterceptorService,
            multi: true
        },],
        exports: [LoaderComponent],

    bootstrap: [AppComponent]
})
export class AppModule { }
