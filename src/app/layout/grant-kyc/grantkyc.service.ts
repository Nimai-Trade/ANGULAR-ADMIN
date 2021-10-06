import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class GrantkycService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }
  
  getGrantKycList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'status': fileterObj.status,
    };
    return this.httpClient.post(URLS.getGrantKycListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
  viewMakerApprovedKycByKycId(reqData){
    return this.httpClient.post(URLS.viewMakerApprovedKycByKycIdUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  CheckerkycStatusUpdate(reqData) {
    return this.httpClient.post(URLS.postKycStatusUpdate, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


}
