import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ReportconnectService } from '../service/reportconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { TasknestedconnectService } from '../service/tasknestedconnect.service';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  constructor(private _userService:UserconnectService,private _reportService:ReportconnectService,private _taskList:TasklistconnectService,private _httpClient:HttpClient,private _tasknestedlisted:TasknestedconnectService) { }
  studData:string='supervisor';
  isHidder:any;
  taskListBean:any;
  taskListByUser:any;
  tasklist:any;
  allUserList:any;
  userListByID:any;
  showView:string='home';
  param:any;
  registrationHidder:boolean=false;
  freshTaskList:any;

  userModal:any={
    userId: '',
    name: '',
    email: '',
    createdOn: '',
  };
  model:taskModel={
    taskId: '',
    startDate:' ',
    name: '',
    comment: '',
    endDate: '',
    description: '',
    quantity: '',
    status: '',
    modifiedOn: ' ',
    createdOn: '',
    
  };
  taskQuery:taskQuery={
    
    tid:'',
    status:2,
    users:[{'uid':''}],
  }
  ngOnInit(): void {
  }
  ngAfterContentInit(data:any) 
  {
     let isLocalStorage=sessionStorage.getItem("sessionUid");
    if(isLocalStorage!=null)
        this.isHidder=true;
    if(data!=null){
      this.isHidder=true;
    }

    this._taskList.getDetail().subscribe(
      (response) => {
        this.freshTaskList=response;
        console.log(this.freshTaskList);
      }
    );
      

    this.getUser();
    this._tasknestedlisted.getDetail().subscribe(
      (response) => {
        this.taskListBean=response;
        console.log(this.taskListBean);
      }
    );
    
    this._userService.getDetail(sessionStorage.getItem("sessionUid"),'').subscribe(
      (response) => {
        this.taskListByUser=response;
        this.tasklist= response.taskList;
        console.log('from');
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
   onboard(param:any){
    switch(param){
      case 'view':this.showView='view';break;
      case 'home':this.showView='home';break;
      case 'add'  :this.showView='add';break;
      case 'delete' :this.showView='delete';break;
      case 'viewTask' :this.showView='viewTask';break;
      case 'report' :this.showView='report';break;
      case 'logout' :this.showView='viewTask';sessionStorage.removeItem("sessionUid");location.reload();break;

    }
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
   freshTaskstatusListItr:any;
   indexStatus:any;
   putstatuschanger(freshTaskstatusListItr:any,indexStatus:any){
    this.indexStatus;
      
     freshTaskstatusListItr.status=indexStatus;
       this._taskList.taskstatuschanger(freshTaskstatusListItr).subscribe(
        (responce)=>{
          alert('Request Accepted!..');
        },
        err=>{
          alert('Request Problem!  :(');
        }
      );
  }
}

export interface taskModel{
  taskId:string;
  startDate:string;
  name:string;
  comment:string;
  endDate:string;
  description:string;
  quantity:string;
  status:string;
  modifiedOn:string;
  createdOn:string;
}

export interface taskQuery{
  tid:string;
  status:number;
  users:usersId[];
}
export interface usersId{
  uid:string;
}
 