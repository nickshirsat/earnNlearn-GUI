import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ReportconnectService } from '../service/reportconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { TasknestedconnectService } from '../service/tasknestedconnect.service';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-reportadmin',
  templateUrl: './reportadmin.component.html',
  styleUrls: ['./reportadmin.component.css']
})
export class ReportadminComponent implements OnInit {

  constructor(private _userService:UserconnectService,private _reportService:ReportconnectService,private _taskList:TasklistconnectService,private _httpClient:HttpClient,private _tasknestedlisted:TasknestedconnectService) { }

  ngOnInit(): void {
  }
  reportList:any;
  subtasklist:any;
  userInfo:any;
  @Input() userId:any=1;
  ngAfterViewChecked(){
     this.reportmethod();
  }
  reportmethod(){
    
      
    this._reportService.genratereport(this.userId).subscribe(
      (response)=>{
          this.reportList=response;
          console.log('here');
          console.log(this.reportList);
          this._taskList.queryviewtasklist(this.userId).subscribe(
            (res)=>{
              this.subtasklist=res;
              console.log(this.subtasklist);
            },
            err=>{
              alert('task not allocated');
            }
            
          );
          this._userService.getDetail(this.userId,'').subscribe(
            (response)=>{
              this.userInfo=response;
              console.log(this.userInfo);
            }
          );

      },
      errr=>{
          alert('Report Not Found/Not Report Available');
      }
    );
   
  }
}
