import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as $ from '../../../assets/js/jquery.min'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    public pushRightClass: string;
    public userInfo = "";
    public role = "";

    constructor(public router: Router, private translate: TranslateService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.userInfo = localStorage.getItem('userInfo');
        this.role = localStorage.getItem('role');
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        // localStorage.removeItem('isLoggedin');
        // localStorage.removeItem('jwtToken');
        // localStorage.removeItem('userInfo');        
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    toggleNavbar() {
        $('body').toggleClass('sidebar-mini');
    }

}
