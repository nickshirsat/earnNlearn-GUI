import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  constructor() { }
  studData:string='supervisor';
 
  ngOnInit(): void {
  }

}
