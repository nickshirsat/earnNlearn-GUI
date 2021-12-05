import { Component, OnInit } from '@angular/core';
import { DepartmentconnectService } from '../service/departmentconnect.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentModel:department={
    did: '',
    name: '',
    modifiedOn: '',
    createdOn:'',
  }
  constructor(public _department:DepartmentconnectService) { }
  desider:boolean=true;
  departmentList:any;
  ngOnInit(): void {
  }
  ngAfterContentInit(){
    this._department.getDetail().subscribe(
      (response) => {
        this.departmentList=response;
        console.log(this.departmentList);
      }
    );
  }
  editDetails(){
    this.desider=!this.desider;
   }
   submitResult(i:any,userItr:any){
    this._department.putDataById(userItr).subscribe(
      res => {
          alert('Succesfuly Register');
        // this.getAlluser();
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
   }
   deletetask(deptItr:any,departmentList:any,i:any){
    alert('Confirm To Delete  '+deptItr.tid);
    this._department.deleteById(deptItr.tid).subscribe(
      res => {
        alert('Succesfuly Deleted');
        this.departmentList.splice(i, 1);
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
  }

}
export interface department{
  did:string;
  name:String;
  modifiedOn:string;
  createdOn:string;
}