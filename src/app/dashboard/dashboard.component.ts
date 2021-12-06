import { Component, EventEmitter, OnInit, Output } from '@angular/core';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   constructor() { }
  isView:boolean=true;
  showView:string=' ';
  showcase:any;
  param:any;
  windowHider:boolean=true;
  windowHiderSeconde:string='flop';
  showcaseStudent:boolean=true;
  showcaseSupervisor:boolean=false;
  showcaseTask:string='task';
  @Output() myOutput:EventEmitter<boolean>= new EventEmitter();  

  //  @Output() LogoutVar=new EventEmitter< >();
   ngOnInit(): void {
  }
  ngAfterContentInit(){
    
  }
  onboard(param:any){
    if(param=='student')
      this.showcase='student';
    else if(param=='supervisor')
        this.showcase='supervisor';
    else if(param=='tasklist'){
        this.showcase='tasklist';
        this.windowHiderSeconde='flip';
    }
    else if(param=='report')
      this.showcase='report';
    else if(param=='department'){
      this.showcase='department';
     }
    else if(param=='college')
      this.showcase='college';
    else if(param=='logout'){
      let logout=sessionStorage.removeItem("sessionUid")
      if(logout==null){
         alert("Logout Successfully");
         location.reload();
         this.myOutput.emit(true);  
         }
      else alert("Logout Unsuccessfully");

     }

  }
  onboardSupervisor(){
    this.showcaseSupervisor;
   }
  onboardStudent(){
    this.showcaseStudent =!this.showcaseStudent;
   }
  updateOperation(){
    this.showView='update';
  }
  viewOperation(){
    this.showView='view';
  }
deletetOperation(){
    this.showView='delete';
}
addOperation(){
  this.showView='add';
}
}

