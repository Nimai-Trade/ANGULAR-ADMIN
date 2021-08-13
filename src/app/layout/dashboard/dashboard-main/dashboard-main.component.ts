import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  role: any;

  constructor(private router: Router) { 

  }

  ngOnInit() {
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

}
