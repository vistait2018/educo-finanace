import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillsService } from '../bills.service';
import { ClassesService } from '../classes.service';

import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { CompulsoryBill, StoreBill,GeneralBill,Classes} from '../../types/api'

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
})
export class BillComponent implements OnInit, OnDestroy {
  loaded:boolean = false;
 
 dtTrigger1: Subject<any> = new Subject<any>();
 dtTrigger2: Subject<any> = new Subject<any>();
 dtTrigger3: Subject<any> = new Subject<any>();
 dtOptions1: DataTables.Settings = {};
 dtOptions2: DataTables.Settings = {};
 dtOptions3: DataTables.Settings = {};
 id:number|undefined;
 myclasses:any;
 name:string|undefined;
 amount:number|undefined;
 type:number|undefined;
 school_class_id:number|undefined;
 description:string|undefined;
  compulsoryBills:CompulsoryBill[] = [];
  storeBills:StoreBill[] =[];
  specificAndCompulsoryBill:StoreBill[]= [];
  generalBill:GeneralBill[]=[];
  classes:Classes[]=[];
  billType = 0|1|2;
  
  
  constructor(private billsService :BillsService,
    private  classesService:ClassesService) { }

  ngOnInit(): void {
    this.getBills();
    this.getGeneralBills();
    this.getStoreBills();
    this.getClasses();
    this.getSpecificAndCompulsoryBill();
   
  }


  getBills(){
    this.billsService.fetchCompulsoryBills().subscribe(
      (data)=>{
        
       this.compulsoryBills = data.data;
      
       setTimeout(() => {
        this.dtTrigger1.next();
        }, 0);
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
       console.log('completed')
       }, 
    )
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe(); 
    this.dtTrigger3.unsubscribe(); 

  }  

  getClasses(){
    this.classesService.fetchClasses().subscribe(
      (data)=>{
        
       this.classes = data.data;
      
       setTimeout(() => {
        this.dtTrigger1.next();
        }, 0);
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
       console.log('completed')
       }, 
    )
  }
  checkBillType(type:number){
    if(type === 1){
     return 'Compulsory';
    }else if(type === 0){
     return 'General';
    }else if(type === 0){
      return 'Store';
    }
    else{
      return "General";
    }
  }

  
  getGeneralBills(){
    this.billsService.fetchGeneralBills().subscribe(
      (data)=>{
        
       this.generalBill = data.data;
      
       setTimeout(() => {
        this.dtTrigger2.next();
        }, 0);
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
       console.log('completed')
       }, 
    )
  }

  getSpecificAndCompulsoryBill(){
    this.billsService.fetchSpecificCompulsoryBills().subscribe(
      (data)=>{
        
       this.specificAndCompulsoryBill = data.data;
      
       setTimeout(() => {
        this.dtTrigger3.next();
        }, 0);
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
       console.log('completed')
       }, 
    )
  }

  getStoreBills(){
    this.billsService.fetchStoreBills().subscribe(
      (data)=>{
        
       this.storeBills = data.data;
      
       setTimeout(() => {
        this.dtTrigger3.next();
        }, 0);
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
       console.log('completed')
       }, 
    )
  }


  onSubmitClassesForm(form:any){
    form.value.type = 1;
    form.value.school_class_id = form.value.school_class_id[0]
    this.billsService.create(form.value).subscribe(
      (data)=>{
        
            
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
         Swal.fire('Success', 'Compulsory Bill Created ', 'info')
         this.getBills();
       console.log('completed')
       }, 
    )
    console.log(form.value);
  }

  onSubmitStoreForm(form:any){
    form.value.type = 2;
    //form.value.school_class_id = form.value.school_class_id[0]
    this.billsService.create(form.value).subscribe(
      (data)=>{
        
            
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true; 
         Swal.fire('Success', 'Store Bill Created ', 'info')

         this.getStoreBills();
       console.log('completed')
       }, 
    )
    console.log(form.value);
  }

  onSubmitGeneralForm(form:any){
    form.value.type = 0;
   
    this.billsService.create(form.value).subscribe(
      (data)=>{
        
            
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
         Swal.fire('Success', 'General Bill Created ', 'info')
         this.getGeneralBills();
       console.log('completed')
       }, 
    )
    console.log(form.value);
  }


  onSubmitSpecificCompulsoryForm(form:any){
    form.value.type = 3;
   
    this.billsService.create(form.value).subscribe(
      (data)=>{
        
            
       console.warn(data)
      },
      (error)=>{
        console.log(error)
       },
       ()=>{
         this.loaded =true;
         Swal.fire('Success', 'General Bill Created ', 'info')
         this.getGeneralBills();
       console.log('completed')
       }, 
    )
    console.log(form.value);
  }

 
  setId(id:any, type:any){
       this.billType= type;
        this.id = id;
    console.warn(this.id);
    if(this.id != undefined) this.delete(id);
    
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
      this.billsService.delete(id).subscribe(
        (data)=>{ 
          console.log(this.id)
          Swal.fire('Success', 'Bill deleted', 'info')
         
        },
        (error)=>{throw new Error('Unable to delete data')},
        ()=>{
          console.log('completed');
         if(this.billType === 0){
           this.getBills();
         }


         if(this.billType === 1){
          this.getGeneralBills();
        }

        if(this.billType === 2){
          this.getStoreBills();
        }
      }
      )
      
     
     }
    })
  } 


  onSubmitEditBillForm(form:any){
    console.log(form.value);
  }
}
