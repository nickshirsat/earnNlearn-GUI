import { Component, OnInit } from '@angular/core';
import { SupervisorlistconnectService } from '../service/supervisorlistconnect.service';
import { TasklistconnectService } from '../service/tasklistconnect.service';

@Component({
  selector: 'app-supervisorlist',
  templateUrl: './supervisorlist.component.html',
  styleUrls: ['./supervisorlist.component.css']
})
export class SupervisorlistComponent implements OnInit {

  
  constructor(private _supervisorListService:SupervisorlistconnectService) { }
  supervisorListBean:any;
  ngOnInit(): void {
    this._supervisorListService.getDetail().subscribe(
      (response) => {
        this.supervisorListBean=response;
        console.log(this.supervisorListBean);
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

}
