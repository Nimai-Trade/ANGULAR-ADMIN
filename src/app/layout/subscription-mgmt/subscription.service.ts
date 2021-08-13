import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  getVasList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'country': fileterObj.country
    };
    return this.httpClient.post(URLS.getVasMakerListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getCountryList() {
    return this.httpClient.get(URLS.getCountryList, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  
  saveVasDetails(reqData): Observable<any> {
    return this.httpClient.post(URLS.postSaveVasDetailsUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


  getPendingVasList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'country': fileterObj.country
    };
    return this.httpClient.post(URLS.getVasCheckerPendingListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getVasDetailsById(id) {
    return this.httpClient.get(URLS.getVasDetailsByIdUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateVasStatus(reqData) {
    return this.httpClient.post(URLS.getVasApproveRejectUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getSubscriptionList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    let country=''
    if(fileterObj.country=="All"){
      country=null
    }else{
      country=fileterObj.country
    }
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'country': country,
      'customerType':fileterObj.customerType,
      'status':fileterObj.status
    };
    return this.httpClient.post(URLS.getSubscriptionListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getSubscriptionDetailsById(id) {
    return this.httpClient.get(URLS.getSubscriptionDetailsByIdUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  saveSubscriptionDetails(reqData): Observable<any> {
    return this.httpClient.post(URLS.getSaveSubscriptionDetails, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateSubscriptionStatus(reqData) {
    return this.httpClient.post(URLS.getActionSubscriptionDetails, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

}
