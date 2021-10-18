import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class BanksService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  getTransactionList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'userId': fileterObj.userId,
      'emailId': fileterObj.emailId,
      'mobileNo': fileterObj.mobileNo,
      'bankName': fileterObj.companyName,
      'country': fileterObj.country,
      'txtStatus': fileterObj.txtStatus,
      'role': fileterObj.role,
    };
    return this.httpClient.post(URLS.getBankSearchListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  searchUserId(userId,data) {
    
    return this.httpClient.get(URLS.getUserIdSearchUrl + userId +'/'+ data, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  searchEmailId(emailId) {
    return this.httpClient.get(URLS.getEmailIdSearchUrl + emailId , { headers: this.headers }).pipe(
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

  loadBankDetail(id) {
    return this.httpClient.get(URLS.getBankDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  planOfPaymentDetail(id) {
    return this.httpClient.get(URLS.getPlanOfPaymentDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  kycDetail(id) {
    return this.httpClient.get(URLS.getCustomerKycDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  kycStatusUpdate(reqData) {
    return this.httpClient.post(URLS.postMakerKycStatusUpdate, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


  getQuoteList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'userId': fileterObj.userId,
      'txtStatus': fileterObj.txtStatus,
    };
    return this.httpClient.post(URLS.getQuoteListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  searchBankName(bankName, data) {
    console.log(bankName +'/'+ data)
    return this.httpClient.get(URLS.getBankNameSearchUrl + bankName, { headers: this.headers }).pipe(
      debounceTime(500),
      map(
        (data: any) => {
          return (data.length !== 0 ? data as any[] : ['No Record Found' as any]);
        })
    );
  }

  // getGrantKycList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
  //   const reqData = {
  //     'page': page,
  //     'size': size,
  //     'sortBy': sortBy,
  //     'direction': direction,
  //     'status': fileterObj.status,
  //   };
  //   return this.httpClient.post(URLS.getGrantKycListUrl, reqData, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res;
  //     })
  //   );
  // }

  updatePaymentStatus(reqData) {
    return this.httpClient.post(URLS.posWwireTranferStatusUpdate, reqData, { headers: this.headers }).pipe(
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
