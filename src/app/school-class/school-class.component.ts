import { Component, OnInit,OnDestroy } from '@angular/core';
import { ClassesService } from '../classes.service';
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.css']
})
export class SchoolClassComponent implements OnDestroy, OnInit {

 collection:any ;
 id: number | undefined;
 name: string | undefined;
 loaded:boolean = false;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject<any>();
  

  constructor(private classService : ClassesService) { }

  ngOnInit(): void {

    this.loadClasses();
   
    
   
  }
  loadClasses(){
    this.classService.fetchClasses()
   .subscribe((result) => {
     if(result.status ==="Success"){
        // @ts-ignore
        $.showMessage(result.message, 'success')
     }
        this.collection = result.data;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 0);
        console.log(this.collection)
      },
        (error) => {
          console.log(error)
        },
        () => {
          this.loaded = true;
        }
      );
  }
  
  onSubmitNew(form:any){
     
    console.log(form.value)
    this.classService.create(form.value)
    .subscribe((data)=>{
      this.loadClasses();
      Swal.fire('Success', 'New Class Created!', 'info')
      console.log(data)
    },
    (error)=>{ console.log(error) },
    ()=>{console.log('completed') }
    )

     

  }
  onSubmitEdit(form: any) {
    console.log(form.value)
    this.classService.update(form.value.id,form.value) 
    .subscribe((data)=>{
       this.loadClasses();
       Swal.fire('Success', 'Class Updated!', 'info')
       console.log(data)
     },
     (error)=>{ console.log(error) },
     ()=>{console.log('completed') }
     )

  }

  setClass(id: number, name: string) {
    this.name = name;
    this.id = id;

  }

  deleteId(id:number){
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
      this.classService.delete(id).subscribe(
        (data)=>{ 
          console.log(this.id)
         
         this.loadClasses();
        },
        (error)=>{throw new Error('Unable to delete data')},
        ()=>{console.log('completed')}
      )
      
     
     }
    })
   
   
  }
 
   ConfirmBox(title:string, text:string, callback:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
    
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
}
 
ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}  
 
}