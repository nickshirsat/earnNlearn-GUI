import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportconnectService {

  constructor(private _httpClient:HttpClient) { }
  genratereport(rid:any){
    let url="http://localhost:8080/task/getReport/";
    return this._httpClient.get<any>(url+rid);
  }
}
