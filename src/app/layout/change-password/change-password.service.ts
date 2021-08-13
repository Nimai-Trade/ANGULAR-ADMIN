import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  setNewPassword(data): Observable<any> {
    return this.httpClient.post(URLS.postChangePasswordByUserUrl, data, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }



}
