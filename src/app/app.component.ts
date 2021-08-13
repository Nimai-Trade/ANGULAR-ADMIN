import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { BnNgIdleService } from 'bn-ng-idle';
import { NavigationEnd, Router } from '@angular/router';
import {MatDialog} from '@angular/material';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private dialogRef: MatDialog,public router: Router,private bnIdle: BnNgIdleService,private translate: TranslateService, public cookieService :CookieService) {
        translate.setDefaultLang('en');        
    }

    ngOnInit(): void {
        this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
          if (isTimedOut) {
            this.dialogRef.closeAll();
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        });
      }
}
