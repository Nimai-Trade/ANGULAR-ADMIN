import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';
import { getLocaleDateFormat } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private headers = new HttpHeaders();
  bankType: string;
  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  getPayConfAwaited(): Observable<any> {
    return this.httpClient.get(URLS.getPaymentConAwaitedUrl, { headers: this.headers });
  }
  getPayApproval(): Observable<any> {
    return this.httpClient.get(URLS.getPaymentApprovalUrl, { headers: this.headers });
  }
  getAssgRmCount(): Observable<any> {
    return this.httpClient.get(URLS.getAssignRmCount, { headers: this.headers });
  }
  getGrantRmCount(): Observable<any> {
    return this.httpClient.get(URLS.getGrantRmCount, { headers: this.headers });
  }
  getGrantUserCount(): Observable<any> {
    return this.httpClient.get(URLS.getGrantUserCount, { headers: this.headers });
  }
  getPendingKycAppCount(): Observable<any> {
    return this.httpClient.get(URLS.getPendingKycApprovalCount, { headers: this.headers });
  }
  getGrantKycCount(): Observable<any> {
    return this.httpClient.get(URLS.getGrantKycCount, { headers: this.headers });
  }
  getPendingKycCount(subscriberType, bankType): Observable<any> {
    const req = {

      'subscriberType': subscriberType,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getPendingKyc, req);
  }
  getSubsExpiryCount(subscriberType, bankType): Observable<any> {

    const param = {

      'subscriberType': subscriberType,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getSubsExpiry, param);
  }
  getPayPendingCount(subscriberType, bankType): Observable<any> {

    const param = {

      'subscriberType': subscriberType,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getPaymentPending, param);
  }
  getPendingRequests(role,subscriberType, bankType): Observable<any> {
    const param = {
      "role":role,
      'subscriberType': subscriberType,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getPendingRequests, param);
  }


  getCustRevenue(dateFrom, dateTo): Observable<any> {
    const req = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getCustomerRevenue, req).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getBankAsCustomerRevenue(dateFrom, dateTo): Observable<any> {
    const req = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getBankAsCustRevenue, req).pipe(
      map((res) => {
        return res;
      })
    );;
  }

  getBankUwRevenue(dateFrom, dateTo): Observable<any> {
    const req = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getBankAsUwRevenue, req).pipe(
      map((res) => {
        return res;
      })
    );;
  }

  getTotalQReceived(dateFrom, dateTo): Observable<any> {
    const req = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getTotalQReceived, req).pipe(
      map((res) => {
        return res;
      })
    );;
  }
  getTotalQAccepted(dateFrom, dateTo): Observable<any> {
    const req = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getTotalQAccepted, req).pipe(
      map((res) => {
        return res;
      })
    );;
  }
  getTotalQClosed(dateFrom, dateTo): Observable<any> {
    const req = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getTotalQClosed, req).pipe(
      map((res) => {
        return res;
      })
    );;
  }
  getSubscriptionGrant(): Observable<any> {
    return this.httpClient.get(URLS.getGrantSubscriptionCount, { headers: this.headers });
  }
  getVasGrantCount(): Observable<any> {
    return this.httpClient.get(URLS.getGrantVasCount, { headers: this.headers });
  }
  getGrantCouponsCount(): Observable<any> {
    return this.httpClient.get(URLS.getGrantDiscountCouponsCount, { headers: this.headers });
  }
  getOverAllCust(subscriberType): Observable<any> {
    const param = {
      'subscriberType': subscriberType
    }
    return this.httpClient.post(URLS.getOverAllCustomersCount, param);
  }
  getOverAllReferrer(subscriberType): Observable<any> {
    const param = {
      'subscriberType': subscriberType
    }
    return this.httpClient.post(URLS.getOverAllReferrerCount, param);
  }
  getOverAllBank(subscriberType, bankType): Observable<any> {
    const request = {
      'subscriberType': subscriberType,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getOverAllBankCount, request);
  }
  getCustomerTranStatCount(status): Observable<any> {
    const req = {
      'status': status
    }
    return this.httpClient.post(URLS.getCustStatTransCount, req);
  }
  // getCountryDetails(page: number, size: number, sortBy: any, direction: any): Observable<any> {
  //   const reqData = {
  //     'page': page,
  //     'size': size,
  //     'sortBy': sortBy,
  //     'direction': direction
  //   };
  //   return this.httpClient.post(URLS.getCountryAnalysis, reqData, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res;
  //     })
  //   )   
  // }
 getCountryDetails(): Observable<any> {   
    return this.httpClient.get(URLS.getCountryAnalysis, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    )   
  }
  getNewUserStatsCount(dateFrom, bankType): Observable<any> {
    const params = {
      'dateFrom': dateFrom,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getNewUserStatCount, params, { headers: this.headers }).pipe(map((res) => {
      return res;
    }));
  }

  getActiveUserStats(dateFrom, bankType): Observable<any> {
    const param = {
      'dateFrom': dateFrom,
      'bankType': bankType
    }
    return this.httpClient.post(URLS.getActiveUserStat, param, { headers: this.headers }).pipe((res) => {
      return res;
    })
  }

  getTransactionalStat(subscriberType, bankType, dateFrom, dateTo): Observable<any> {
    const param = {
      'subscriberType': subscriberType,
      'bankType': bankType,
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getTransactionStat, param).pipe((res) => {
      return res;
    })
  }

  getAvgQuotesPerTrans(dateFrom, dateTo): Observable<any> {
    const param = {
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getQuotesPerTrxnStat, param).pipe((res) => {
      return res;
    })
  }
  //>>>>>>>>>>>>>>>
  getAllTransStat(subscriberType,bankType,dateFrom,dateTo):Observable<any>{
    const param={
      'subscriberType':subscriberType,
      'bankType':bankType,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getCustTrans, param).pipe((res) => {
      return res;
    })
  }


  getCustAccptdTransStat(status,dateFrom,dateTo):Observable<any>{
    const param={
      'status':status,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getCustAccptdTrans, param).pipe((res) => {
      return res;
    })
  }
  getCustRejectedTransStat(status,dateFrom,dateTo):Observable<any>{
    const param={
      'status':status,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getCustRejectedTrans, param).pipe((res) => {
      return res;
    })
  }

  getCustExpiredTransStat(status,dateFrom,dateTo):Observable<any>{
    const param={
      'status':status,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getCustRejectedTrans, param).pipe((res) => {
      return res;
    })
  }
  getAllCustomers(subscriberType,dateFrom,dateTo):Observable<any>{
    const param={
      'subscriberType':subscriberType,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getCustomerss, param).pipe((res) => {
      return res;
    })
  }
  getActiveCustomerTrans():Observable<any>{
    
    return this.httpClient.get(URLS.getActiveCustTrans).pipe((res) => {
      return res;
    }) 
  }

  getTransExpiry(subscriberType):Observable<any>{
    const req={
      'subscriberType':subscriberType
    }
    return this.httpClient.post(URLS.getTransExpiry,req).pipe((res) => {
      return res;
    }) 
  }
  getPayPending(subscriberType):Observable<any>{
    const req={
  
      'subscriberType':subscriberType
    }
    return this.httpClient.post(URLS.getCustPayPending,req).pipe((res) => {
      return res;
    }) 
  }

  getPayPendingRM(subscriberType):Observable<any>{
  
    const req={
    'companyName':localStorage.getItem('nimaiId'),
      'subscriberType':subscriberType
    }
    return this.httpClient.post(URLS.getCustPayPending,req).pipe((res) => {
      return res;
    }) 
  }

  getCustKycPending(subscriberType):Observable<any>{
    const req={
      'subscriberType':subscriberType
    }
    return this.httpClient.post(URLS.getCustKycPending,req).pipe((res) => {
      return res;
    }) 
  }
  getCustSubscriptionExpiry(subscriberType,bankType):Observable<any>{
    const req={
      'subscriberType':subscriberType,
      "bankType":bankType
    }
    return this.httpClient.post(URLS.getSubscriptionExp,req).pipe((res) => {
      return res;
    }) 
  }
  getReferrer(subscriberType):Observable<any>{
    const req={
      'subscriberType':subscriberType
    }
    return this.httpClient.post(URLS.getReferrerCount,req).pipe((res) => {
      return res;
    }) 
  }
  getCustTransactionalStat(subscriberType,dateFrom, dateTo): Observable<any> {
    const param = {
      'subscriberType': subscriberType,
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getCustTransactionStat, param).pipe((res) => {
      return res;
    })
  }
//>>>>>>>>>>>
getBankTransStat(subscriberType,dateFrom, dateTo): Observable<any> {
  const param = {
    'subscriberType': subscriberType,
    'dateFrom': dateFrom,
    'dateTo': dateTo
  }
  return this.httpClient.post(URLS.getBankTrxnStat, param).pipe((res) => {
    return res;
  })
}

getBankAvgQuotes(dateFrom,dateTo):Observable<any>{
  const param={
    "dateFrom":dateFrom,
    "dateTo":dateTo
  }
  return this.httpClient.post(URLS.getBankAvgQuotesStat,param).pipe((res)=>{return res;})
}

getAllBankTransStat(subscriberType,bankType,dateFrom,dateTo):Observable<any>{
  const param={
    'subscriberType':subscriberType,
    'bankType':bankType,
    'dateFrom':dateFrom,
    'dateTo':dateTo
  }
  return this.httpClient.post(URLS.getBankAllTranStat, param).pipe((res) => {
    return res;
  })
}

  getBankAcceptedTran(subscriberType,bankType,status,dateFrom,dateTo): Observable<any>{
    const param = {
      'subscriberType': subscriberType,
      'bankType':bankType,
      'dateFrom': dateFrom,
      'status':status,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getBankAccepted, param).pipe((res) => {
      return res;
    })
  }
  getBankCustomers(subscriberType,bankType,dateFrom,dateTo): Observable<any>{
    const param = {
      'subscriberType': subscriberType,
      'bankType':bankType,
      'dateFrom': dateFrom,
      'dateTo': dateTo
    }
    return this.httpClient.post(URLS.getBankCustomers, param).pipe((res) => {
      return res;
    })
  }
  getTotalQuotes(subscriberType,dateFrom,dateTo): Observable<any>{
    const param={
      'subscriberType':subscriberType,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getTotalBankQuotes, param).pipe((res) => {
      return res;
    })
  }
  getQuotesOnStatus(subscriberType,status,dateFrom,dateTo): Observable<any>{
    const param={
      'subscriberType':subscriberType,
      'status':status,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    }
    return this.httpClient.post(URLS.getQuotesonStatus, param).pipe((res) => {
      return res;
    })
  }
  getBankAs(bankType): Observable<any>{
    const param={
      'bankType':bankType
    }
    return this.httpClient.post(URLS.getBankCount, param).pipe((res) => {
      return res;
    })
  }
  getQutesAwaitedBank(): Observable<any>{
    return this.httpClient.get(URLS.getQuotesAwaited).pipe((res) => {
      return res;
    })
  }

  getCustTComp(dateFrom,dateTo):Observable<any>{
    const param={
      "dateFrom":dateFrom,
      "dateTo":dateTo

    }
    return this.httpClient.post(URLS.getCustTranCompStat,param).pipe((res)=>{
      return res;
    })
  }
}
