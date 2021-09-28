import { Classes } from './../../types/api';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { DepartmentsService } from '../departments.service';
import Swal from 'sweetalert2'
import { Department, School,SchoolClassInDepartment } from '../../types/api';
import {ClassesService } from '../classes.service'
import { Subject } from 'rxjs';




@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnDestroy, OnInit {
  
  departments:Department[] = []
  rowCounter:number = 0;
  classes:Classes[] =[];
  myClass:any
  classesInDept:any
  id:any;
  classId:any
  name:string|undefined;
  loaded:boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    private departmentService:DepartmentsService,
    private schoolClassService:ClassesService
    ) { }

  ngOnInit(): void {
   this.getAllDepartments()
   this.getSchoolClasses()
   this.getAllDepartments()
  }

  setDepartment(id:any,name:string){
  this.id = id;
  this.name = name;
  console.warn(name)
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
      this.departmentService.delete(id).subscribe(
        (data)=>{ 
          console.log(this.id)
          Swal.fire('Success', 'Department deleted', 'info')
         this. getAllDepartments();
        },
        (error)=>{throw new Error('Unable to delete data')},
        ()=>{console.log('completed')}
      )
      
     
     }
    })
  }


  onSubmitNewDept(form:any){
    console.log(form.value)
    this.departmentService.create(form.value)
    .subscribe((data)=>{
     this.getAllDepartments();
     Swal.fire('Success', 'New School Department Created!', 'info')
      console.log(data)
    },
    (error)=>{ console.log(error) },
    ()=>{console.log('completed') }
    )
  }
  onSubmitEditDept(form:any){
    console.log(form.value)
    this.departmentService.update(form.value.id, form.value)
    .subscribe((result)=>{
      this.getAllDepartments();
      Swal.fire('Success', 'School Department Updated!', 'info')
      // console.log(result)
    }, 
    (error)=>{ console.log(error) },
    ()=>{console.log('completed') }
    )
   
  }

  getAllDepartments(){
  this.departmentService.getDepartments()
  .subscribe((result)=>{
      //console.log("Students"+ result.data)
      if (result.status === "Success") {
        // @ts-ignore
        $.showMessage(result.message, 'success')
      }
    this.departments = result.data;
    setTimeout(() => {
      this.dtTrigger.next();
    }, 0);
    //console.warn(result)
  },
  (error)=>{ console.warn(error)},
  ()=>{  this.loaded = true;}
  )
  }

  getSchoolClasses(){
    this.schoolClassService.fetchClasses()
  .subscribe((result)=>{
    this.classes = result.data;
    //console.warn(result)
  },
  (error)=>{ console.warn(error)},
  ()=>{ console.warn('completed')}
  )
  }
  
  getClassesInDepartment(id:any){
    this.id = id;
    console.warn(id)
    this.departmentService.getSchoolClassesFromDepartments(this.id)
  .subscribe((result)=>{

    this.classesInDept = result.data;
    
    console.warn('School classes' + result.status)
  },
  (error)=>{ console.warn(error)},
  ()=>{ console.warn('completed')}
  )
  }
  onSubmitClassForm(form:any){
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
      this.departmentService.addSchoolClass(form.value.id,form.value).subscribe(
        (data)=>{ 
          console.log(this.id)
          Swal.fire('Success', 'Classes added to department', 'info')
         this. getAllDepartments();
        },
        (error)=>{throw new Error('Unable add classes to department')},
        ()=>{console.log('completed')}
      )
      
     
     }
    })
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}
}