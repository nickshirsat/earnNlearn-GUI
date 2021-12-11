import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasklistconnectService {

  constructor(private httpClient:HttpClient) { }
  getDetail():Observable<any>{
     let url="http://localhost:8080/task/getTaskList/";
    return this.httpClient.get<any>(url);
   }

    queryById(taskModel:any):Observable<any>{
    let url="http://localhost:8080/task/assignTask";
    return this.httpClient.put<any>(url,taskModel);
    }

   deleteById(uid:number):Observable<any>{
    let url="http://localhost:8080/task/deleteTaskById/";
    return this.httpClient.delete<any>(url+uid);
   }
   putDataById(userItr:any):Observable<any>{
    let url="http://localhost:8080/task/updateTask/";
    return this.httpClient.put<any>(url,userItr);
   }

   queryviewtasklist(userId:any){
      let url="http://localhost:8080/task/getTaskByUid/";
      return this.httpClient.get<any>(url+userId);
   }
   taskstatuschanger(putstatusItr:any){
      let url="http://localhost:8080/task/updateTask";
      return this.httpClient.put<any>(url,putstatusItr);
   }
}
