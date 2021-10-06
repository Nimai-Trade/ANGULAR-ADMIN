// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-loader',
//   templateUrl: './loader.component.html',
//   styleUrls: ['./loader.component.scss']
// })
// export class LoaderComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { LoaderServiceService } from 'src/app/shared/services/loader/loader-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean;

  constructor(private loaderService: LoaderServiceService) {

    this.loaderService.isLoading.subscribe((v) => { 
      this.loading = v;
    });

  }
  ngOnInit() {
  }

}

