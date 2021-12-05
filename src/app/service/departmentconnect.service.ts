import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentconnectService {

  constructor(private _httpClient:HttpClient) { }
  getDetail():Observable<any>{
    let url="http://localhost:8080/department/getAllDepartment/";
   return this._httpClient.get<any>(url);
  }
  putDataById(userItr:any):Observable<any>{
    let url="http://localhost:8080/department/updateDepartment/";
    return this._httpClient.put<number>(url,userItr);
   }
   createData(model:any):Observable<any>{
    console.log(model);
    let url="http://localhost:8080/department/insertDepartment/";
    return this._httpClient.post<any>(url,model);
   }
   deleteById(uid:number):Observable<any>{
    let url="http://localhost:8080/department/deleteById/";
    return this._httpClient.delete<number>(url+uid);
   }
}
