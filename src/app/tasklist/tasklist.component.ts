import { Component, Input, OnInit } from '@angular/core';
import { TasklistconnectService } from '../service/tasklistconnect.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
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
  constructor(private _taskListService:TasklistconnectService) { }
  @Input() window:any;
  @Input() windowSeconde:any;
  desider:boolean=true;

  taskListBean:any;
  ngOnInit(): void {
   
  }
  ngAfterContentInit(){
    this._taskListService.getDetail().subscribe(
      (response) => {
        this.taskListBean=response;
        console.log(this.taskListBean);
      }
    );
  }
  public getTaskDetail():any{
   return  null;
  }

  status: boolean = true;
  activeIndex:any='';
clickEvent(i:any){
  this.activeIndex=i;
    this.status = !this.status;       
}
editDetails(){
  this.desider=!this.desider;
 }
 submitResult(i:any,userItr:any){
  this._taskListService.putDataById(userItr).subscribe(
    res => {
        alert('Succesfuly Register');
      // this.getAlluser();
    },
    err => {
      alert("An error has occurred while sending feedback");
    }
  );
 }
 deletetask(taskItr:any,taskListBean:any,i:any){
  alert('Confirm To Delete  '+taskItr.tid);
  this._taskListService.deleteById(taskItr.taskId).subscribe(
    res => {
      alert('Succesfuly Deleted !..');
      this.taskListBean.splice(i, 1);
    },
    err => {
      alert("An error has occurred while sending feedback");
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
