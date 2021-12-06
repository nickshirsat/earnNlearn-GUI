import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasklistconnectService } from '../service/tasklistconnect.service';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
  registerForm:any= FormGroup;
  submitted = false;
  desider:boolean=true;
  model:userModel={
    userId: '',
    email: '',
    name: '',
    password: '',
    
    
  };
  insertModel:studentModel={
    name:' ',
     email: '',
     password: '',
    role:{'roleId':'3'},
  }
  
  constructor(private _userService:UserconnectService,private _tasklistbyuser:TasklistconnectService,private formBuilder: FormBuilder,private _httpClient:HttpClient) { }
  @Input() showView:any=' ';
  changeVar:any;
  ngOnInit(): void {
    this._userService.getAllDetail().subscribe(
      (response) => {
        this.userList=response;
        console.log(response);
      }
    );

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
    
  }
  ngAfterContentInit(){
    this.showView;
    this.getAlluser();
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else{
        console.log(this.insertModel);
      let url="http://localhost:8080/user/insertUser";
      this._httpClient.post(url,this.insertModel).subscribe(
        res => {
          console.log(this.insertModel);
          // sessionStorage.setItem("sessionUid",this.insertModel.userId);
          alert('Succesfuly Register');
          this.getAlluser();
        },
        err => {
          alert("Confirm");
          this.getAlluser();
        }
      );
      }
      alert('Selected   '+this.insertModel.email)
  }
  submitView(i:any,userItr:any){
    
  }
   delRow:boolean=false;
   status: boolean = false;
  deleteUser(userItr:any,userList:any,i:any){
    
    
    alert('Confirm To Delete  '+userItr.userId);
    this._userService.deleteById(userItr.userId).subscribe(
      res => {
        alert('Succesfuly Deleted');
        this.userList.splice(i, 1);
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
  }
  
  userList:any;
   getAlluser(){
    this._userService.getAllDetail().subscribe(
      (response) => {
        this.userList=response.filter;
        console.log(response);
      }
    );
   }
   editDetails(){
    this.desider=!this.desider;
   }
   submitResult(i:any,userItr:any){
    this._userService.putDataById(userItr).subscribe(
      res => {
          alert('Succesfuly Register');
        this.getAlluser();
      },
      err => {
        alert("Confirm");
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
export interface roles{
  roleId:string;
 }
 export interface studentModel{
  name:string;
  email:string;
  password:string;
  role:roles;
}
 