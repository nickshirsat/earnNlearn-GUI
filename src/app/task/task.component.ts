import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { TaskconnectService } from '../service/taskconnect.service';
 
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
   
  taskModel: TaskModel={
    id:'',
    comment:'',
    description:'',
    endDate:'',
    name:'',
    quantity:'',
    startDate:'',
    start_time:'',
    end_time:'',
    final_starttimestamp:'',
    final_endtimestamp:'',
  }
  constructor(private _taskconnect:TaskconnectService) { }
   
  
  ngOnInit(): void {
     
  }
  putDetail(taskModel:any){
     this.taskModel.startDate=this.taskModel.startDate+' '+this.taskModel.final_starttimestamp;
     this.taskModel.startDate=new  Date(this.taskModel.startDate).toISOString();
     console.log(this.taskModel.startDate);
    // this.taskModel.startDate=new Date().toISOString();
    this.taskModel.endDate=this.taskModel.endDate+' '+this.taskModel.final_endtimestamp;
    this.taskModel.endDate=new  Date(this.taskModel.endDate).toISOString();
     console.log(this.taskModel.endDate); 
    // var timedate={{startDate.toString()+final_starttimestamo}};
    //  this.taskModel.endDate=

     this._taskconnect.createTask(this.taskModel).subscribe(     
      res => {
         alert('Successfully Generated');
         location.reload();
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
    
  }
}
export interface TaskModel{
  id:string;
  comment:string;
  description:string;
  endDate:string;
  name:string;
  quantity:string;
  startDate:string;
  start_time:string;
  end_time:string;
  final_starttimestamp:'',
  final_endtimestamp:'',
}