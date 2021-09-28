import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2'
import {  User,UserPaginate } from '../../types/api';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
 users: User[] =[];
 name:string|undefined;
 email:string|undefined;
 id:number|undefined;

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.allUsers();
  }


  allUsers(){
    this.usersService.getUsers().subscribe(
      (data)=>{
        this.users = data.data;
        console.log(data)

    })
  }
  onSubmitUserForm(form:any){
    console.log(form.value);
   let user:User= {
      'name': form.value.name,
      'password':this.randomstring(12),
      'email': form.value.name

    }
    this.usersService.makeUser(user).subscribe(
      (data)=>{console.log(data)},
      (error)=>{console.log(error)},
      ()=>{console.log('complete')}
      
      )
  }


   randomstring(L:any) {
    var s = '';
    var randomchar = function() {
      var n = Math.floor(Math.random() * 62);
      if (n < 10) return n; //1-10
      if (n < 36) return String.fromCharCode(n + 55); //A-Z
      return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < L) s += randomchar();
    return s;
  }

}
