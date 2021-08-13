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
export class ReportService {

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  getReportUidExcel(requirementType, userId, dateFrom, dateTo): Observable<any> {   
     console.log("datefrom---",dateFrom)
     console.log("dateTo---",dateTo)
    const params = {
      'requirementType':requirementType,
      'userId':userId,
      'dateFrom':dateFrom,
      'dateTo':dateTo
    } 
    console.log("param----",params)
    return this.httpClient.post(URLS.getReportUIdExcelUrl, params, { responseType: 'blob' }).pipe(
      map((res: any) => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        if(blob.size>177){
          const file = new File([blob], requirementType.replace(' ','_') + "_" + new Date().getTime() + '.xlsx', { type: 'application/vnd.ms.excel' });
          saveAs(file);
        }else{
          return "Data is not present for this date range please select proper dates"
        }
        
      })
    );
  }

}
