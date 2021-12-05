import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserconnectService {

  constructor(private httpClient:HttpClient) { }
  getDetail(uid:any,upskw:any):Observable<any>{
    console.log(uid);
    let url="http://localhost:8080/user/getUserById/";
    return this.httpClient.get<any>(url+uid);
   }
   getAllDetail():Observable<any>{
    let url="http://localhost:8080/user/getAllUser";
    return this.httpClient.get<any>(url);
   }

   deleteById(uid:number):Observable<any>{
    let url="http://localhost:8080/user/deleteById/";
    return this.httpClient.delete<number>(url+uid);
   }
   putDataById(userItr:any):Observable<any>{
    let url="http://localhost:8080/user/updateUser/";
    return this.httpClient.put<number>(url,userItr);
   }
}
