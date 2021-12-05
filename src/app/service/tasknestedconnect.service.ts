import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasknestedconnectService {
  
  constructor(private  _httpClient:HttpClient) { }
  getDetail():Observable<any>{
    let url="http://localhost:8080/task/getTaskList/";
   return this._httpClient.get<any>(url);
  }
  deleteById(uid:number):Observable<any>{
   let url="http://localhost:8080/task/deleteTaskById/";
   return this._httpClient.delete<number>(url+uid);
  }
  putDataById(userItr:any):Observable<any>{
   let url="http://localhost:8080/task/updateTask/";
   return this._httpClient.put<number>(url,userItr);
  }
  getDetailById(uid:number):Observable<any>{
    let url="http://localhost:8080/task/getById/";
   return this._httpClient.get<any>(url+uid);
  }
  
}
