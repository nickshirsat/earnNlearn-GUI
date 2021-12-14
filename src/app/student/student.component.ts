import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserconnectService } from '../service/userconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { TasknestedconnectService } from '../service/tasknestedconnect.service';
import { ReportconnectService } from '../service/reportconnect.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  userModal:any={
    userId: '',
    name: '',
    email: '',
    createdOn: '',
  }
  taskQuery:taskQuery={
    
    tid:'',
    status:-1,
    users:[{'uid':''}],
  }
  reportModel:reportObjModel={
    id: '',
    transactionId: '',
    date: '',
    status: '',
    modifiedOn: '',
    cratedOn: '',
    };
  constructor(private _userService:UserconnectService,private _reportService:ReportconnectService,private _taskList:TasklistconnectService,private _httpClient:HttpClient,private _tasknestedlisted:TasknestedconnectService) { }
  isHidder:boolean=false;
  showView:string='home';
  userListByID:any; 
  param:any;
  taskListBean:any;
  static index:number=0;
  taskListByUser:any;
  tasklist:any;
  allUserList:any;
  desiderReporter:boolean=true;
  sessionVariable:boolean=false;
  givePermission:string='student';

   ngOnInit(): void {

  }
  
  ngAfterContentInit(data:any) 
  {
     let isLocalStorage=sessionStorage.getItem("sessionUid");
     let isUnameLocalStorage=sessionStorage.getItem("sessionUname");
    if(isLocalStorage!=null && isUnameLocalStorage=='student')
        this.isHidder=true;
    if(data!=null){
      this.isHidder=true;
    }
    this.getUser();
    this._tasknestedlisted.getDetail().subscribe(
      (response) => {
        this.taskListBean=response;
        
      }
    );
    this._userService.getDetail(sessionStorage.getItem("sessionUid"),'').subscribe(
      (response) => {
        this.taskListByUser=response;
        this.tasklist= response.taskList;
        console.log(this.tasklist);
      }
    );
    this._userService.getAllDetail().subscribe(
      (response) => {
        this.allUserList=response;
        console.log(response);
      }
    );
   }
   deleteUser(taskItr:any,taskList:any,i:any){
    
    
    alert('Confirm To Delete  '+taskItr.tid);
    this._userService.deleteById(taskItr.tid).subscribe(
      res => {
        alert('Succesfuly Deleted');
        this.tasklist.splice(i, 1);
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
  }
  startTask(){
  }
    getTaskDetail(taskItem:any){
      let session=sessionStorage.getItem("sessionUid");
     console.log(this.taskQuery);
       console.log(taskItem.taskId);
       this.taskQuery.tid=taskItem.taskId;
       this.taskQuery.status=-1;
       
       this.taskQuery.users[0].uid=this.taskListByUser.userId;
        this._httpClient.put<any>('http://localhost:8080/task/assignTask', this.taskQuery)
        .subscribe(res => alert('sucessfully added'));
   }



   
   listUserCurrentTask:any;
  queryforusertask(userId:any){
    this._taskList.queryviewtasklist(userId).subscribe(
      (response) => {        
        this.listUserCurrentTask=response;
    },
    err => {
      alert("No Task Added");
    }
    );

  }
  
   onboard(param:any){
      switch(param){
        case 'view':this.showView='view';break;
        case 'home':this.showView='home';break;
        case 'add'  :this.showView='add';break;
        case 'delete' :this.showView='delete';break;
        case 'viewTask' :this.showView='viewTask';this.queryforusertask(sessionStorage.getItem("sessionUid"));break;
        case 'report' :this.showView='report';break;
        case 'logout' :this.showView='viewTask';sessionStorage.removeItem("sessionUid");sessionStorage.removeItem("sessionUname");location.reload();break;

      }
   }
   status: boolean = true;
   activeIndex:any='';
 clickEvent(i:any){
   this.activeIndex=i;
     this.status = !this.status;       
 }
  getUser(){
    let isLocalStorage=sessionStorage.getItem("sessionUid");
      this._httpClient.get<any>('http://localhost:8080/user/getUserById/'+isLocalStorage).subscribe(
       (response) => {
         this.userListByID=response;   
         this.userModal.userId=this.userListByID.userId;
         this.userModal.name=this.userListByID.name;
         this.userModal.email=this.userListByID.email;
         this.userModal.createdOn=this.userListByID.createdOn;  
         console.log(this.userListByID);
        } 
     );
   }
   indexDesider:any;
   putstatusdata(taskItem:any,indexDesider:any){
    taskItem.status=indexDesider;     
    this._taskList.taskstatuschanger(taskItem).subscribe(
     (responce)=>{ 
       alert('Request Accepted!..');
     },
     err=>{
       alert('Request Problem!  :(');
     }
   );

   }
   
 }
export  interface userList{
  userId:string;
  name:string;
  email:string;
  createdOn:String;
}
export interface reportObjModel{
  id:string;
  transactionId:string;
  date:string;
  status:string;
  modifiedOn:string;
  cratedOn:string;
}
export interface taskQuery{
  tid:string;
  status:number;
  users:usersId[];
}
export interface usersId{
  uid:string;
}