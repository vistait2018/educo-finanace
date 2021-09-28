import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
import Swal from 'sweetalert2'
import {  School } from '../../types/api';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms'



@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  loaded = false;
   //id:number|undefined;
  
  constructor(private schoolservice:SchoolService, 
   
    ) { }
  
  school_logo = "";

  schoolForm =  new FormGroup({
    address:new FormControl('',Validators.required),
    school_name:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phone_no1:new FormControl('',Validators.required),
    established_at:new FormControl('',Validators.required),
    school_owner:new FormControl('',Validators.required),
    school_logo:new FormControl('../../assets/img/default-avatar.png'),
    created_at:new FormControl(''),
    updated_at:new FormControl(''),
    phone_no2:new FormControl(''),
    id:new FormControl(''),

   }
     
   )

   uploadLogo = null;

  ngOnInit(): void {
    this.getSchool();
  }
  
  submitSchool(){
    console.warn(this.schoolForm.get('id'))
    let id:any  =this.schoolForm.get('id')
    const value = { ...this.schoolForm.value, id: +this.schoolForm.value.id };
    Swal.fire({
      title: 'Are you sure',
      text: 'You are about to perform an irreversible operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it!',
      cancelButtonText: 'No, keep it'
    }).then((s)=>{
      if(s.isConfirmed){
        this.schoolservice.updateSchool(+this.schoolForm.value.id,value).subscribe(
          (data)=>{ 
            console.log(data)
            Swal.fire('Success', 'School Record Updated!', 'info')
            this.getSchool();
          },
          (error)=>{throw new Error('Unable to Update School Info')},
          ()=>{console.log('completed')}
        )
        
       
       }
    })
     }

  
  
     getSchool(){
    this.schoolservice.getSchool().subscribe(
      (result)=>{
        if (result.status === "Success") {
          // @ts-ignore
          $.showMessage(result.message, 'success')
        }
        console.log(result)
         this.school_logo = "http://localhost:8000/" + result.data.school_logo;
     
       this.schoolForm.setValue({
        address: result.data.address,
        school_name:result.data.school_name,
        email:result.data.email,
        phone_no1:result.data.phone_no1,
        established_at:result.data.established_at,
        school_owner:result.data.school_owner,
        school_logo: result.data.school_logo,
        created_at: result.data.created_at,
        updated_at:result.data.updated_at,
        phone_no2:result.data.phone_no2 === null ?'--Not Available--':result.data.phone_no2 ,
        id:result.data.id,
    
       });
      
        console.warn( result)
      },
      (error)=>{ console.warn(error)},
      ()=>{ this.loaded = true}

    )
  }

  uploaLogo(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadLogo = file;
      const formData = new FormData();
      
      formData.append('school_logo', file);
      this.schoolservice.uploadSchoolLogo(this.schoolForm.get("id")?.value,formData).
      subscribe((result)=>{
       
        this.getSchool()
        console.warn(result)
      },
      (errror)=>{ 
        Swal.fire('Info', 'School logo must be of type jpg,png,jpeg,gif,svg with max width of 100psx, max height of 100px and max size of 2048mb', 'info') 
        console.error(errror);
      },
      ()=>{console.warn('completed')},
      )
    }
  }
}
