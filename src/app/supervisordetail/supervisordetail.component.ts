import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-supervisordetail',
  templateUrl: './supervisordetail.component.html',
  styleUrls: ['./supervisordetail.component.css']
})
export class SupervisordetailComponent implements OnInit {
  registerForm:any= FormGroup;
  submitted = false;
  desider:boolean=true;
  model:userModel={
    uid: '',
    email: '',
    name: '',
    password: '',
    
  };
  
  constructor(private _userService:UserconnectService,private formBuilder: FormBuilder,private _httpClient:HttpClient) { }
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

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else{
      let url="http://localhost:8080/user/insertUser";
      this._httpClient.post(url,this.model).subscribe(
        res => {
          console.log(this.model);
          localStorage.setItem("sessionUid",this.model.email);
          alert('Succesfuly Register');
          this.getAlluser();
        },
        err => {
          alert("An error has occurred while sending feedback");
        }
      );
      }
      alert('Selected   '+this.model.name)
  }
   delRow:boolean=false;
   status: boolean = false;
  deleteUser(userItr:any,userList:any,i:any){
    
    
    alert('Confirm To Delete  '+userItr.uid);
    this._userService.deleteById(userItr.uid).subscribe(
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
        this.userList=response;
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
        alert("An error has occurred while sending feedback");
      }
    );
   }

}
export interface userModel{
  uid:string;
  email:string;
  name:string;
  password:string;
}