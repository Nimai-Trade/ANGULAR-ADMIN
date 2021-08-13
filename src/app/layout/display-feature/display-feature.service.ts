import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';
import { saveAs } from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export class DisplayFeatureService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${URLS.postDisplayFeatureUpload}`, formData, { headers: this.headers });
    return this.httpClient.request(req);

  }

  downloadExample(): Observable<any> {
    return this.httpClient.get(URLS.getDisplayFeatureDownload, { responseType: 'blob' }).pipe(
      map((res: any) => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        const file = new File([blob], `displayfeature_${new Date().getTime()}.xlsx`, { type: 'application/vnd.ms.excel' });
        saveAs(file);
      })
    );
  }

  loadCountryDetails(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'country': fileterObj.country,
      'status': 'Active'
    }
    return this.httpClient.post(URLS.getDisplayFeatureDetails, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountryList() {
    return this.httpClient.get(URLS.getDisplayFeatureCountry, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

}
