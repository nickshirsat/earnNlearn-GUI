import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskconnectService {

  constructor(private httpClient:HttpClient) { }
  createTask(model:any):Observable<any>{
    console.log(model);
    let url="http://localhost:8080/task/saveTask/";
    return this.httpClient.post<any>(url,model);
   }
}
