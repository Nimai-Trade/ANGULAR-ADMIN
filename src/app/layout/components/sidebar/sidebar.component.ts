import { Component, OnInit, HostBinding } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    role:any;
    userInfo:any;
    public showMenu: string;
    public areaExpandedacc = "";
    public accountPages = "";
    public isCustomer = "";
    public isBank = "";
    public areaExpandedtra = "";
    transactionpages = "";
    discountPages=";"
    isFixedNavbar: any;
    public show = "";
    rightList : any;
    myRights : any;
    user: any;

    @HostBinding('class.sidebar-opened') navbarOpened = false; 
    
    constructor(public router: Router,public cookieService: CookieService) { }

    ngOnInit() {
        this.rightList = localStorage.getItem('userRight');
        this.role = localStorage.getItem('role');
        this.userInfo = localStorage.getItem('userInfo');
       // console.log("this.rightList--->",this.rightList)
        // console.log(savedData);
        // this.rightList = savedData;.
        this.myRights = this.rightList.split(',');
        this.showMenu = '';
        
        this.user = localStorage.getItem('nimaiId');
        
    }
    onLoggedout() {
        // localStorage.removeItem('isLoggedin');
        // localStorage.removeItem('jwtToken');
        // localStorage.removeItem('userInfo');        
        localStorage.clear();
        this.router.navigate(['/login']);
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    disableGrantKyc(){
        
    }
}
