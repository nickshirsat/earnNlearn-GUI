import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ReportconnectService } from '../service/reportconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { TasknestedconnectService } from '../service/tasknestedconnect.service';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private _userService:UserconnectService,private _reportService:ReportconnectService,private _taskList:TasklistconnectService,private _httpClient:HttpClient,private _tasknestedlisted:TasknestedconnectService) { }

  ngOnInit(): void {
  }
  reportList:any;
  subtasklist:any;
  userInfo:any;
   ngAfterContentInit(){
     this.reportmethod();
  }
  reportmethod(){
    
       const user_id=sessionStorage.getItem("sessionUid");
    
    this._reportService.genratereport(user_id).subscribe(
      (response)=>{
          this.reportList=response;
          console.log('here');
          console.log(this.reportList);
          this._taskList.queryviewtasklist(user_id).subscribe(
            (res)=>{
              this.subtasklist=res;
              console.log(this.subtasklist);
            },
            err=>{
              alert('task not allocated');
            }
            
          );
          this._userService.getDetail(user_id,'').subscribe(
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
