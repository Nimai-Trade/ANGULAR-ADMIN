import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class DiscountMgmtService {
  private headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }
  getCouponStatusList(status,page: number, size: number, sortBy: any, direction: any){    
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'status':status
    };
    if(status=="Pending"){
      return this.httpClient.post(URLS.getPendingCouponListUrl, reqData, { headers: this.headers }).pipe(
        map((res) => {
          return res;
        })
      );
    }else if(status=="Active"){
      return this.httpClient.post(URLS.getActiveCouponListUrl, reqData, { headers: this.headers }).pipe(
        map((res) => {
          return res;
        })
      );
    }else if(status=="Inactive"){
      return this.httpClient.post(URLS.getInactiveCouponListUrl, reqData, { headers: this.headers }).pipe(
        map((res) => {
          return res;
        })
      );
    }else if(status=="Expired"){
      return this.httpClient.post(URLS.getExpiredCouponsListUrl, reqData, { headers: this.headers }).pipe(
        map((res) => {
          return res;
        })
      );
    }else if(status=="Rejected"){
      return this.httpClient.post(URLS.getRejectedCouponsListUrl, reqData, { headers: this.headers }).pipe(
        map((res) => {
          return res;
        })
      );
    }
  }
  // Coupon Api Calls

  getCouponList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'role': fileterObj.role
    };
    return this.httpClient.post(URLS.getCouponListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getplanName(reqData): Observable<any> {
    return this.httpClient.post(URLS.getplanNameUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getExcel(reqData): Observable<any> {
    let params = new HttpParams()
      .set('country', reqData.country)
      .set('customerType', reqData.customerType)
      .set('bankType', reqData.bankType)
      .set('coupon', reqData.coupon);

    return this.httpClient.post(URLS.getExcelUrl, params, { responseType: 'blob' }).pipe(
      map((res: any) => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        const file = new File([blob],reqData.filename + "_" + new Date().getTime() + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);
      })
    );
  }
  getUploadHeaders() {
    let header = new Headers({ 'Accept': 'application/json' });
    header.delete('Content-Type');
    return header;
  }
  saveCouponDetails(formData: FormData): Observable<any> {
    let flag = formData.get("flag");
    if (flag === "1") {
      return this.httpClient.post(URLS.postSaveCouponUrl, formData, { responseType: 'json' }).pipe(
        map((res) => {
          return res;
        })
      );
    } else {
      return this.httpClient.post(URLS.postSaveCouponUrl, formData, { responseType: 'json' }).pipe(
        map((res) => {
          return res;
        })
      );
    }
  }

  getCouponDetailsById(id) {
    return this.httpClient.get(URLS.getCouponDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateCouponStatus(reqData) {
    return this.httpClient.post(URLS.getStatusUrl, reqData, { headers: this.headers }).pipe(
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
