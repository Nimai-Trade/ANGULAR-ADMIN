import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class ReferrerService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  getReferrerList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
 
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'userId': fileterObj.userId,
      'emailId': fileterObj.emailId,
      'mobileNo': fileterObj.mobileNo,
      'companyName': fileterObj.companyName,
      'country': fileterObj.country,
      'txtStatus': fileterObj.txtStatus,
    };
    return this.httpClient.post(URLS.getReferrerListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  searchUserId(userId, data) {
    return this.httpClient.get(URLS.getUserIdSearchUrl + userId +'/'+ data, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchEmailId(emailId) {
    return this.httpClient.get(URLS.getEmailIdSearchUrl + emailId, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchMobileNumber(mobileNo) {
    return this.httpClient.get(URLS.getMobileNumberSearchUrl + mobileNo , { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchCompanyName(companyName) {
    return this.httpClient.get(URLS.getCompanyNameSearchUrl + companyName , { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchCountry(country) {
    return this.httpClient.get(URLS.getTransactionCountrySearchUrl + country, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  loadCustomerDetail(id) {
    return this.httpClient.get(URLS.getCustomerDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getReferList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'userId': fileterObj.userId,
      'status': fileterObj.status,
      'txtStatus': fileterObj.type,
    };
    return this.httpClient.post(URLS.getReferrerReferListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  loadReferDetail(id) {
    return this.httpClient.get(URLS.getRefererDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


}
