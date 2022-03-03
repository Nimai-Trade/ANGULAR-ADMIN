import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  getTransactionList(page: number, size: number, sortBy: any, direction: any, fileterObj: any,status: string): Observable<any> {
    var str=[];
    console.log(localStorage.getItem('role'))
    if(localStorage.getItem('role')=='Bank RM'){
      str[0]= 'BANK';
      str[1]='CUSTOMER';
    }else{
      // str[0]= '';
      // str[1]='';
    }
    
   
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
      'role': fileterObj.role,
      'subscriberType': str[0],
      'bankType' : str[1]
    };
    return this.httpClient.post(URLS.getSearchCustomerListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  searchUserId(userId) {
    return this.httpClient.get(URLS.getTransactionUserIdSearchUrl + userId, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchEmailId(emailId) {
    return this.httpClient.get(URLS.getTransactionEmailIdSearchUrl + emailId, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchMobileNumber(mobileNo) {
    return this.httpClient.get(URLS.getTransactionMobileNumberSearchUrl + mobileNo, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchCompanyName(companyName) {
    return this.httpClient.get(URLS.getTransactionCompanyNameSearchUrl + companyName, { headers: this.headers }).pipe(
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

  removeSubsidiary(reqData) {
    return this.httpClient.post(URLS.postRemoveSubsidiary, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


}
