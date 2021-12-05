import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserconnectService } from '../service/userconnect.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _userService:UserconnectService) { }

  ngOnInit(): void {
  }
  finishLogin:boolean=false;
  getDetails(uid:any,upskw:any,form:NgForm){
    this._userService.getDetail(uid.value,upskw.value).subscribe(
      res => {
        console.log(res.password);
        if(res.uid==uid.value){
          if(res.password==upskw.value){
           alert('Login Successfuly');
           form.reset();
           localStorage.setItem("sessionUid",res.uid);
           this.finishLogin=true;
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
