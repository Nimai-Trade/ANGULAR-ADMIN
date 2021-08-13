import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { URLS } from 'src/environments/config.url';
import { saveAs } from 'file-saver';
import { resolveComponentResources } from '@angular/core/src/metadata/resource_loading';


@Injectable({
  providedIn: 'root'
})
export class RefundCreditService {
  private headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
  }
}
