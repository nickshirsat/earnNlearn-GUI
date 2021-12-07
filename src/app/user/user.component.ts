import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
 
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
model:userModel={
  userId: '',
  email: '',
  name: '',
  password: '',
  
};
roleModel:roleModel={
  userId: '',
  email: '',
  name: '',
  password: '',
  role:{roleId:''},
};
  @Output() userConfirmation:EventEmitter<string>=new EventEmitter<string>();
  @Output() userSupervisorConfirmation:EventEmitter<string>=new EventEmitter<string>();

  hideClass:boolean=false;
  ngOnInit(): void {
  }                                                            
  constructor(private userService:UserconnectService,private httpClient:HttpClient ) { }
  @Input() studData:string='';

  getAlert(userId:any){
    alert(userId.value);
  }
  userEmails = new FormGroup({
    primaryEmail: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
    

  registeruser(f:NgForm): void{
    let url="http://localhost:8080/user/insertUser";
    this.httpClient.post(url,this.model).subscribe(
      res => {
         f.reset();
        //localStorage.setItem("sessionUid",this.model.email);
        alert('Succesfuly Login');
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
    alert('Selected   '+this.model.name)
  
  }
 
  getDetails(userId:any,upskw:any,form:NgForm){
    this.userService.getDetail(userId.value,upskw.value).subscribe(
      res => {
        console.log(userId.value);
        if(res.userId==userId.value){
          if(res.password==upskw.value){
           alert('Login Successfuly');
           form.reset();
          //  sessionStorage.setItem("sessionUid",userId.value);
          //   this.userConfirmation.emit(userId.value);

           if(res.role.roleId=='2'){
              sessionStorage.setItem("sessionUid",userId.value);
              this.userSupervisorConfirmation.emit(userId.value);
              alert('Supervisor Login Only');
           }
           else if(res.role.roleId=='3'){
            sessionStorage.setItem("sessionUid",userId.value);
            this.userConfirmation.emit(userId.value);
            alert('Student Login Only');
           }
           else if(res.role.roleId=='1'){
            sessionStorage.setItem("sessionUid",userId.value);
            this.userConfirmation.emit(userId.value);
            alert('Admin Login Only');
           }

          }
          else
            alert('Password Not Match/Not Found');
        }
        else alert('User Id Not Found');
      },
      err => {
        alert("User Not Found");
      }
    );
    
   }
}
export interface userModel{
  userId:string;
  email:string;
  name:string;
  password:string;
}
export interface roleModel{
  userId:string;
  email:string;
  name:string;
  password:string;
  role:{roleId:string};
}