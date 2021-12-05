import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CollegeComponent } from './college/college.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { StudentComponent } from './student/student.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { TaskComponent } from './task/task.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { UserComponent } from './user/user.component';
/**
 * Router routes for index navigation
 * @author Ganesh Chavan
 * Date 23/11/2021
 */
const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'task',component:TaskComponent},
  {path:'payment',component:PaymentComponent},
  {path:'college',component:CollegeComponent},
  {path:'admin',component:AdminComponent},
  {path:'user/supervisor',component:SupervisorComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'studentdetail',component:StudentdetailComponent},
  {path:'supervisordetail',component:StudentdetailComponent},
  {path:'department',component:DepartmentComponent},
  {path:'user/student',component:StudentComponent},
  
  {path:'tasklist',component:TasklistComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
