import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserconnectService } from '../service/userconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { TasknestedconnectService } from '../service/tasknestedconnect.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  userModal:any={
    uid: '',
    name: '',
    email: '',
    createdOn: '',
  }
  reportModel:reportObjModel={
    id: '1',
    transactionId: '21',
    date: '1997-6-10',
    status: 'Completed',
    modifiedOn: '1997-6-10',
    cratedOn: '1997-6-10',
    };
  constructor(private _userService:UserconnectService,private _httpClient:HttpClient,private _tasknestedlisted:TasknestedconnectService) { }
  isHidder:boolean=false;
  showView:string='home';
  userListByID:any; 
  param:any;
  taskListBean:any;
  taskListByUser:any;
  tasklist:any;
  allUserList:any;
  desiderReporter:boolean=true;
  ngOnInit(): void {

  }
  ngAfterContentInit(data:any) 
  {
    let isLocalStorage=localStorage.getItem("sessionUid");
    if(isLocalStorage!=null)
        this.isHidder=true;
    if(data!=null){
      this.isHidder=true;
    }
    this.getUser();
    this._tasknestedlisted.getDetail().subscribe(
      (response) => {
        this.taskListBean=response;
        console.log(this.taskListBean);
      }
    );
    this._userService.getDetail(localStorage.getItem("sessionUid"),'').subscribe(
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

   getTaskDetail(){}
   onboard(param:any){
      switch(param){
        case 'view':this.showView='view';break;
        case 'home':this.showView='home';break;
        case 'add'  :this.showView='add';break;
        case 'delete' :this.showView='delete';break;
        case 'viewTask' :this.showView='viewTask';break;
        case 'report' :this.showView='report';break;

      }
   }
   status: boolean = true;
   activeIndex:any='';
 clickEvent(i:any){
   this.activeIndex=i;
     this.status = !this.status;       
 }
  getUser(){
    let isLocalStorage=localStorage.getItem("sessionUid");
      this._httpClient.get<any>('http://localhost:8080/user/getUserById/'+isLocalStorage).subscribe(
       (response) => {
         this.userListByID=response;   
         this.userModal.uid=this.userListByID.uid;
         this.userModal.name=this.userListByID.name;
         this.userModal.email=this.userListByID.email;
         this.userModal.createdOn=this.userListByID.createdOn;  
         console.log(this.userListByID);
        } 
     );
   }
   
 }
export  interface userList{
  uid:string;
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