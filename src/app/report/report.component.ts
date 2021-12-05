import { Component, OnInit } from '@angular/core';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportModel:reportObjModel={
  id: '1',
  transactionId: '21',
  date: '1997-6-10',
  status: 'Completed',
  modifiedOn: '1997-6-10',
  cratedOn: '1997-6-10',
  };
  constructor(private _userService:UserconnectService) { }
  studData:string='student';
  desider:boolean=false;
  userList:any;
  desiderReporter:boolean=false;
  showView='hidder';
  containHider:boolean=true;
  ngOnInit(): void {
    this._userService.getAllDetail().subscribe(
      (response) => {
        this.userList=response;
        console.log(response);
      }
    );
  }
  editDetails(){
    this.desider=!this.desider;
   }
   removeReport(){
      this.containHider=!this.containHider;
   }
   submitResult(i:any,userItr:any){
    this._userService.putDataById(userItr).subscribe(
      res => {
          alert('Succesfuly Register');
       // this.getAlluser();
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
   }

}
export interface reportObjModel{
  id:string;
  transactionId:string;
  date:string;
  status:string;
  modifiedOn:string;
  cratedOn:string;
}
