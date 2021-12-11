import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AdminComponent } from './admin/admin.component';
import { TaskComponent } from './task/task.component';
import { PaymentComponent } from './payment/payment.component';
import { CollegeComponent } from './college/college.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserconnectService } from './service/userconnect.service';
import { TasklistComponent } from './tasklist/tasklist.component';
import { StudentComponent } from './student/student.component';
import { SupervisorlistComponent } from './supervisorlist/supervisorlist.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import { SupervisordetailComponent } from './supervisordetail/supervisordetail.component';
import { ReportComponent } from './report/report.component';
import { DepartmentComponent } from './department/department.component';
import { ReportadminComponent } from './reportadmin/reportadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SupervisorComponent,
    AdminComponent,
    TaskComponent,
    PaymentComponent,
    CollegeComponent,
    HomeComponent,
    DashboardComponent,
    TasklistComponent,
    StudentComponent,
    SupervisorlistComponent,
    StudentdetailComponent,
    SupervisordetailComponent,
    ReportComponent,
    DepartmentComponent,
    ReportadminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [UserconnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
