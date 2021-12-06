import { Component, OnInit } from '@angular/core';
 import { DepartmentconnectService } from '../service/departmentconnect.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentModel:department={
    deptId:'',
     name: '',
     college: {'cid':'1'},
     user:{'uid':'1'}
     
  }
   
  constructor(public _department:DepartmentconnectService) { }
  desider:boolean=true;
  departmentList:any;
  collegeList:any;
  ngOnInit(): void {
  }
  ngAfterContentInit(){
    this._department.getDetail().subscribe(
      (response) => {
         this.departmentList=response;
         console.log(response);
      }
    );
  }
  editDetails(){
    this.desider=!this.desider;
   }
   registerDeprtment(departmentModel:any){
    this._department.createData(departmentModel).subscribe(
      res => {
          alert('Succesfuly Register');
        // this.getAlluser();
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
   }
   submitResult(i:any,deptItr:any){
    this._department.putDataById(deptItr).subscribe(
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
  deptId:string;
   name:String;
   college:colleges;
    user:users;
}
export interface colleges{
  cid:string;
}
export interface users{
  uid:string;
}