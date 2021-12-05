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
    end_date:'',
    name:'',
    quantity:'',
    start_date:'',
  }
  constructor(private _taskconnect:TaskconnectService) { }
   
  
  ngOnInit(): void {
     
  }
  putDetail(taskModel:any){
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
  end_date:string;
  name:string;
  quantity:string;
  start_date:string;
}