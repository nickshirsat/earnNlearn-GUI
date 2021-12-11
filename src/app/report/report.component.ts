import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReportconnectService } from '../service/reportconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportModel:reportObjModel={
    userId:'',
    name:'',
    email:'',
    role:{name:''},
    duration:'',
    };
  constructor(private _userService: UserconnectService, private _reportService: ReportconnectService, private _taskList: TasklistconnectService, private _httpClient: HttpClient) { }
  studData: string = 'student';
  desider: boolean = true;
  userList: any;
  desiderReporter: boolean = false;
  showView = 'hidder';
  containHider: boolean = true;
  passUid: any;
  reportList: any;
  subtasklist: any;
  userInfo: any;
  ngOnInit(): void {
    this._userService.getAllDetail().subscribe(
      (response) => {
        this.userList = response;
        console.log(response);
      }
    );
  }
  editDetails() {
    this.desider = !this.desider;
  }

  removeReport(userItr: any) {
    this.containHider = !this.containHider;
     this.passUid=userItr.userId;
    this.passreportinfo(this.passUid);
   }

   passreportinfo(passUid:any){
    this._userService.getDetail(passUid,'').subscribe(
      (response)=>{
        this.userInfo=response;
        this.reportModel.userId=this.userInfo.userId;
        this.reportModel.name=this.userInfo.name;
        this.reportModel.email=this.userInfo.email;
        this.reportModel.role.name=this.userInfo.role.name;
        console.log(this.userInfo);
      }
    );
    this._reportService.genratereport(passUid).subscribe(
      (response)=>{
          this.reportList=response;
          this.reportModel.duration=this.reportList.duration;
      }
       );
   }
   
    

}  
export interface reportObjModel{
  userId:string;
  name:string;
  email:string;
  role:{name:''};
  duration:string;
}
export interface reportData{}