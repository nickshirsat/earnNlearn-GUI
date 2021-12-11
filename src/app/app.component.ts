import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'earnlearn';
  constructor(private router: Router ) {

  }
hideBtn:boolean=true;
statusStudent:string='student';
 buttonHide:any=sessionStorage.getItem("sessionUid");

}
