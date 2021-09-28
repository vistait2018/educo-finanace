import { CategoryComponent } from './category/category.component';
import { DepartmentsComponent } from './departments/departments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeLayoutComponent } from './welcome-layout/welcome-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolComponent } from './school/school.component';
import { SchoolClassComponent } from './school-class/school-class.component';
import { AuthLayoutComponent}   from './auth-layout/auth-layout.component';
import { AuthLoginComponent}  from './auth-login/auth-login.component';
import {AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthPasswordEmailConfiramtionComponent } from './auth-password-email-confiramtion/auth-password-email-confiramtion.component';
import {AuthPasswordResetComponent} from './auth-password-reset/auth-password-reset.component';
import {  AuthLockComponent } from './auth-lock/auth-lock.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { SchoolSessionsComponent } from './school-sessions/school-sessions.component';
import { SchooltermsComponent } from './schoolterms/schoolterms.component';
import { StudentsComponent }  from './students/students.component';
import { RolesComponent } from './roles/roles.component'
import { UsersComponent } from './users/users.component'
import { BillComponent } from './bill/bill.component'
import { RebatesComponent } from './rebates/rebates.component'
import {PaymentComponent }  from './payment/payment.component'



const routes: Routes = [ 
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'school',
        component: SchoolComponent
      },
      {
        path: 'school-classes',
        component: SchoolClassComponent
      },
      {
        path: 'school-sessions',
        component: SchoolSessionsComponent
      },
      {
        path: 'school-terms',
        component: SchooltermsComponent
      },
      {
        path: 'school-departments',
        component: DepartmentsComponent
      },
      {
        path: 'school-categories',
        component: CategoryComponent
      },
      {
        path: 'school-roles',
        component: RolesComponent
      },
       {
        path: 'school-users',
        component: UsersComponent
      },
      {
        path: 'school-students',
        component: StudentsComponent
      },

      {
        path: 'school-bills',
        component: BillComponent
      },
      {
        path: 'school-rebates',
        component: RebatesComponent
      },
      {
        path: 'school-payment/class/:classid/student/:studentid',
        component: PaymentComponent
      },
      
     
     
    ]
  },
  {
     path:'auth',
     component:AuthLayoutComponent,
     children:
     [
        {
          path:'',
          component:AuthLoginComponent,
          pathMatch:'prefix'
        },
        {
          path:'login',
          component:AuthLoginComponent,
          pathMatch:'prefix'
        },
         
        { path:'register',
          component:AuthRegisterComponent,
          pathMatch:'prefix'
        },
        { path:'lock',
          component:AuthLockComponent,
          pathMatch:'prefix'
        }
     ]
  },
 
  { path: '**', component:  PageNotFoundComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
