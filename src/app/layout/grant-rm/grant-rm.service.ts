import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class GrantRmService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  getAssignRmList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'userType':fileterObj.userType,
      'status':fileterObj.status
    };
    return this.httpClient.post(URLS.getAssignRmListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateRM(reqData) {
    return this.httpClient.post(URLS.updateRelationshipManagerUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRmList() {
    return this.httpClient.get(URLS.getRmListUrl, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }



}
