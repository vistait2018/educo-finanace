import { Component, OnDestroy, OnInit } from '@angular/core';
import { RolesService } from '../roles.service';
import Swal from 'sweetalert2'
import {  Role } from '../../types/api';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnDestroy, OnInit {
  name:string|undefined;
  id:number|undefined ;
  slug:string|undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loaded = false;
 
  roles:Role[]=[];
  constructor(private roleService:RolesService) { }

  ngOnInit(): void {
   
    this.allRole();

   
    
  }
   
  setId(id:any){
    this.id = id;
    console.log(this.id)
  }
  onSubmitRoleForm(form:any){
     
     console.log(form.value)
     this.roleService.makeRole(form.value)
     .subscribe((result)=>{
       this.allRole();
       Swal.fire('Success', 'School Role Created!', 'info')

  },
  (error)=>{
    console.log(error)
  },
  ()=>{console.log('completed')})
}
  
  allRole(){
    this.roleService.getRoles().subscribe(
      (data)=>{
       // console.log(data)
        if(data.status === "Success"){
           // @ts-ignore
           $.showMessage(data.message, 'success')
        }
        this.roles = data.data;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 0);
   },
   (error)=>{
     console.log(error)
   },
   ()=>{  this.loaded = true;}
   )
  }
  
  editRole(id:any,name:any,slug:any){
      this.id =id;
      this.name =name;
      this.slug =slug;
  }
  
  delete(id:any){
    this.id = id;
    Swal.fire({
      title: 'Are you sure',
      text: 'You are about to perform an irreversible operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
    .then((s)=>{
     if(s.isConfirmed){
      this.roleService.deleteRole(id).subscribe(
        (data)=>{ 
          console.log(this.id)
          Swal.fire('Success', 'Role deleted', 'info')
         this.allRole();
        },
        (error)=>{throw new Error('Unable to delete data')},
        ()=>{console.log('completed')}
      )
      
     
     }
    })
  }

  onSubmitEditRole(form:any){
    console.log(form.value)
    this.roleService.updateRole(form.value.id, form.value)
    .subscribe((result)=>{
      this.allRole();
      Swal.fire('Success', 'School Role Updated!', 'info')
      // console.log(result)
    }, 
    (error)=>{ console.log(error) },
    ()=>{console.log('completed') }
    )
   
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



}
