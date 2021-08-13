import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masters-menus',
  templateUrl: './masters-menus.component.html',
  styleUrls: ['./masters-menus.component.scss']
})
export class MastersMenusComponent implements OnInit {

  activeRoute: string;

  constructor(private router: Router) {
    let route = this.router.routerState.snapshot.url.split('/');
    this.activeRoute = route[route.length - 1];
  }

  ngOnInit() {
  }

}
