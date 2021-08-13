import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';


@Injectable({
  providedIn: 'root'
})
export class AllMasterService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  // Employee Api Calls

  getEmployeeList(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'status' : fileterObj.status
    };
    return this.httpClient.post(URLS.getEmployeeListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  saveEmployeeDetails(reqData): Observable<any> {
    return this.httpClient.post(URLS.postSaveEmployeeUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getEmployeeDetailsById(id) {
    return this.httpClient.get(URLS.getEmployeeDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateEmployeeStatus(reqData) {
    return this.httpClient.post(URLS.getUpdateEmployeeStatusUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }




  // Role Api Calls

  getRoleList(page: number, size: number, sortBy: any, direction: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction
    };
    return this.httpClient.post(URLS.getRoleListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  saveRoleDetails(reqData): Observable<any> {
    return this.httpClient.post(URLS.postSaveRoleUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRoleDetailsById(id) {
    return this.httpClient.get(URLS.getRoleDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateRoleStatus(reqData) {
    return this.httpClient.post(URLS.getUpdateRoleStatusUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkRoleExists(shortName) {
    console.log(shortName);
    return this.httpClient.get(URLS.getCheckExistingRoleUrl + shortName, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // Right Api Calls

  getRightList(page: number, size: number, sortBy: any, direction: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction
    };
    return this.httpClient.post(URLS.getRightListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  saveRightDetails(reqData): Observable<any> {
    return this.httpClient.post(URLS.postSaveRightUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRightDetailsById(id) {
    return this.httpClient.get(URLS.getRightDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateRightStatus(reqData) {
    return this.httpClient.post(URLS.getUpdateRightStatusUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkRightExists(shortName) {
    console.log(shortName);
    return this.httpClient.get(URLS.getCheckExistingRightUrl + shortName, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // Role Rights Mapping Api Calls

  getMappingList(page: number, size: number, sortBy: any, direction: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction
    };
    return this.httpClient.post(URLS.getRoleRightsMappingListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRoleRightsDetailsById(id) {
    return this.httpClient.get(URLS.getRoleDetailsUrl + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRoleDataList() {
    return this.httpClient.post(URLS.getRoleDataList, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


  getRightsDataList() {
    return this.httpClient.post(URLS.getRightsDataList, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRightsDetailById(id) {
    return this.httpClient.post(URLS.getRightsDataById + id, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  submitRightsMapping(reqData) {
    return this.httpClient.post(URLS.saveRightsMapping, reqData, { headers: this.headers }).pipe(
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

  checkEmployeeCode(empCode) {
    return this.httpClient.get(URLS.getCheckEmployeeCodeUrl + empCode, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAssignRmList(page: number, size: number, sortBy: any, direction: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction
    };
    return this.httpClient.post(URLS.getAssignRmListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  sendActivationLink(reqData): Observable<any> {
    return this.httpClient.post(URLS.sendActivationLink, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getGrantEmployee(page: number, size: number, sortBy: any, direction: any, fileterObj: any): Observable<any> {
    const reqData = {
      'page': page,
      'size': size,
      'sortBy': sortBy,
      'direction': direction,
      'status' : fileterObj.status
    };
    return this.httpClient.post(URLS.getEmployeeGrantListUrl, reqData, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      })
    );
  }


}
