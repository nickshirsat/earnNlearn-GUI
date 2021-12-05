import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorlistconnectService {

  constructor(private httpClient:HttpClient) { }
  getDetail():Observable<any>{
     let url="http://localhost:8080/user/getAllUser/";
    return this.httpClient.get<any>(url);
   }
}
