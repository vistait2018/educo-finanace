import { Component, OnInit,OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import {DepartmentsService } from '../departments.service'
import Swal from 'sweetalert2'
import { Category, Department,depertmentInCategory } from '../../types/api';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnDestroy, OnInit {

  categories:any = [{}];
  id: number | undefined;
  name: string | undefined;
  level: string | undefined;
  departments:Department[]  = [];
  myDeparttment:any
  DepartmentsToCategories:any;
  depertmentInCategory:any =[]
  loaded:boolean = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(
    private categoryService:CategoryService,
    private  departmentService:DepartmentsService
    
    ) { }


  ngOnInit(): void {
    this.getAllCategories()
    this.getAllDepartments()
    //this.getDepertmentInCategory(this.id)
  }

  setClass(id: number, name: string, level:string) {
    this.name = name;
    this.id = id;
    this.level = level;
    

  }
  getDepertmentInCategory(id:number){
    console.warn(id);
     this.categoryService.getCategoryDepartments(id)
     .subscribe(
       (result)=>{ 
        this.depertmentInCategory =result.data
         console.warn(this.depertmentInCategory)
        },
       (error)=>{console.warn(error)},
       ()=>{ console.warn('completed')},
     );
  }


  getAllCategories(){
     this.categoryService.fetchCategories()
     .subscribe(
       (result)=>{ 
         
        this.categories =result.data
        setTimeout(() => {
          this.dtTrigger.next();
        }, 0);
         //console.warn( this.categories)
        },
       (error)=>{console.warn(error)},
       ()=>{ console.warn('completed')},
     )
  }

  getAllDepartments(){
    this.departmentService.getDepartments()
     .subscribe(
       (result)=>{ 
        this.departments =result.data
        
setTimeout(() => {
  // @ts-ignore
  $("#department_ids").selectpicker("refresh")
}, 0);
        },
       (error)=>{console.warn(error)},
       ()=>{ console.warn('completed')},
     )
  }

  delete(id:number){
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
      this.categoryService.delete(id).subscribe(
        (data)=>{ 
          console.log(this.id)
          Swal.fire('Success', 'School deleted', 'info')
         this. getAllCategories();
        },
        (error)=>{throw new Error('Unable to delete data')},
        ()=>{console.log('completed')}
      )
      
     
     }
    })
  }
  clearInput(){
     this.name='';
     this.level = '';
     this.id = undefined;
  }

  onSubmitNewCategory(form:any){
     
    console.log(form.value)
     this.categoryService.create(form.value)
     .subscribe((data)=>{
      this.categories=this.getAllCategories();
      Swal.fire('Success', 'New School Category Created!', 'info')
       console.log(data)
     },
     (error)=>{ console.log(error) },
     ()=>{console.log('completed') }
     )
  

  }
  onSubmitEditCategory(form:any){
    console.log(form.value.id)
    this.categoryService.update(form.value.id, form.value)
    .subscribe((result)=>{
      this.getAllCategories();
      Swal.fire('Success', 'School Category Updated!', 'info')
       console.log(result)
    }, 
    (error)=>{ console.log(error) },
    ()=>{console.log('completed') }
    )
   
  }  
  onSubmitAdddeptToCatForm(form:any){
  
   
    console.warn(form.value)
    this.categoryService.addDepartmentsToCategories(form.value.id,form.value).subscribe(
      (result)=>{
    this.getAllCategories();
     Swal.fire('Success', 'Selected Departments have been added to school!', 'info')
      console.log(result)
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
 