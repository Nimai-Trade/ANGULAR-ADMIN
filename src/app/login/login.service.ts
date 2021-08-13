import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';

@Injectable()
export class LoginService {

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  login(data): Observable<any> {
    // let reqData = {
    //   "username": username,
    //   "password": password,
    // }
    return this.http.post(URLS.postLoginUrl, data, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getUserRights(empCode, roleName): Observable<any> {
    let reqData = {
      "empCode": empCode,
      "roleName": roleName
    }
    return this.http.post(URLS.postUserRightsUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


  sendForgetPasswordEmail(data): Observable<any> {
    return this.http.post(URLS.postForgotPasswordUrl, data, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public validateToken(token: string): Observable<any> {
    // return this.httpClient.get(`${environment.domain}/nimaiEmail/validatePasswordLink/` + token, { headers: { 'content-type': 'application/json' } });
    let reqData = {
      "empCode": 'empCode',
      "roleName": 'roleName'
    }
    return this.http.post(URLS.postUserRightsUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
  public validate(token: string): Observable<any> {
    // return this.httpClient.get(`${environment.domain}/nimaiEmail/validatePasswordLink/` + token, { headers: { 'content-type': 'application/json' } });
    let reqData = {
      "empCode": 'empCode',
      "roleName": 'roleName'
    }
    return this.http.post(URLS.postUserRightsUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
  public validateUser(userId): Observable<any> {
    return this.http.post(URLS.validateUser+"/"+userId, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }
  setNewPassword(data): Observable<any> {
    return this.http.post(URLS.postFirsttimeChangePasswordUrl, data, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  sendActivationLink(reqData): Observable<any> {
    return this.http.post(URLS.sendActivationLink, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

} 