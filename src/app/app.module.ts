import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';



import { SchoolService} from './school.service';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { WelcomeLayoutComponent } from './welcome-layout/welcome-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTopNavComponent } from './dashboard-top-nav/dashboard-top-nav.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { SchoolComponent } from './school/school.component';
import { SchoolClassComponent } from './school-class/school-class.component';
import { ClassesService } from './classes.service';
import { StudentsService } from './students.service';
import { CategoryService } from './category.service'
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthNavBarComponent } from './auth-nav-bar/auth-nav-bar.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthPasswordResetComponent } from './auth-password-reset/auth-password-reset.component';
import { AuthPasswordEmailConfiramtionComponent } from './auth-password-email-confiramtion/auth-password-email-confiramtion.component';
import { AuthLockComponent } from './auth-lock/auth-lock.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './category/category.component';
import { DepartmentsComponent } from './departments/departments.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { SchoolSessionsComponent } from './school-sessions/school-sessions.component';
import { SchooltermsComponent } from './schoolterms/schoolterms.component';
import { StudentsComponent } from './students/students.component';
import { BillComponent } from './bill/bill.component';
import { RebatesComponent } from './rebates/rebates.component';
import {DataTablesModule} from 'angular-datatables';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    WelcomeLayoutComponent,
    DashboardComponent,
    DashboardTopNavComponent,
    DashboardSidebarComponent,
    DashboardFooterComponent,
    SchoolComponent,
    SchoolClassComponent,
    AuthLayoutComponent,
    AuthNavBarComponent,
    AuthFooterComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthPasswordResetComponent,
    AuthPasswordEmailConfiramtionComponent,
    AuthLockComponent,
    PageNotFoundComponent,
    CategoryComponent,
    DepartmentsComponent,
    UsersComponent,
    RolesComponent,
    SchoolSessionsComponent,
    SchooltermsComponent,
    StudentsComponent,
    BillComponent,
    RebatesComponent,
    PaymentComponent,
   
    
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    SchoolService,
    ClassesService,
    StudentsService,
    CategoryService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
