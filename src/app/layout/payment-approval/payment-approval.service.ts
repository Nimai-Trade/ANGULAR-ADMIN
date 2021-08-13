import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class PaymentApprovalService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  getWireTransferList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    // console.log("getWireTransferList fileterObj---",fileterObj)
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'userType':fileterObj.userType,
      'status':fileterObj.status,
      'country':fileterObj.country
    };
    return this.httpClient.post(URLS.postWireTranferList, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
getvasWireTransferList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
  // console.log("getvasWireTransferList fileterObj---",fileterObj)
  const reqData = { 
    'page': page,
    'size': size,
    'sortBy': "id",
    'direction': direction,
    'status':"Maker Approved",
    'country':fileterObj.country
  };
  return this.httpClient.post(URLS.vasWireTransferList, reqData, { headers: this.headers }).pipe(
    map((res) => {
      return res;
    })
  );
}
  updatePaymentStatus(reqData) {
    return this.httpClient.post(URLS.posWwireTranferStatusUpdate, reqData, { headers: this.headers }).pipe(
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
}
