import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2'
import { login } from '../../types/api';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import {Router } from '@angular/router'

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {


  loginForm = new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),


  })
  constructor(private authService:AuthService, 
    private cookieService: CookieService,
    private _router:Router ) { }

  ngOnInit(): void {
  }

  submitLogin(){
     console.log(this.loginForm.value);
   this.authService.login(this.loginForm.value).subscribe(
     (data)=>{
       this.cookieService.set( 'login', data.token, 1000 * 60 * 60 );
       this._router.navigate(['/dashboard'])
     },
     (error)=>{
      console.log(error)

    },()=>{
      console.log("completed")

    }
      )
  }

}
