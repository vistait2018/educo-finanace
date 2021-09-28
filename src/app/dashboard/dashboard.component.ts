import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Student, SchoolSessionAndTernmInfo, Classes, StudentPaginate } from '../../types/api';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { StudentsService } from '../students.service';
import { Subject } from 'rxjs';
import { SchoolSessionAndTermsService } from '../school-session-and-terms.service';
import { Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { DepartmentsService} from '../departments.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  students: Student[] = [];
  classes: Classes[] = [];
  first_name: string | undefined;
  middle_name: string | undefined;
  last_name: string | undefined;
  address: string | undefined;
  dob: string | undefined;
  phone_no: string | undefined;
  email: string | undefined;
  gender: string | undefined;
  class_id: number | undefined;
  StudentId: number | undefined;
  class_name: string | undefined;
    no_of_student:number|undefined;
    no_of_school:number|undefined;
    no_of_classes:number|undefined;
    no_of_departments:number|undefined;

  loaded = false;

  dtTrigger: Subject<any> = new Subject<any>();

  seessionAndTermInfo: SchoolSessionAndTernmInfo | undefined;
  sessionName: string | undefined
  termName: string | undefined


  constructor(private studentService: StudentsService,
    private SessionAndTermInfoService: SchoolSessionAndTermsService,
    private classsesService: ClassesService,
    private _router: Router,
    private departmentService:DepartmentsService
  ) { }


  ngOnInit(): void {
   

    this.allStudents();
    this.getSessionAndTermInfo();
    this.allClasses();
    this. allDepartments();
   
   

  }



  getSessionAndTermInfo() {
    this.SessionAndTermInfoService.getSessionTermInfo().subscribe(
      (data) => {
        this.seessionAndTermInfo = data.data;

        this.termName = data.data.term_name
        this.sessionName = data.data.school_session_name
        console.warn(this.seessionAndTermInfo)
      },
      (error) => {
        console.warn(error)
      },
      () => {
        console.warn('completed')
      },

    )
  }
  allStudents() {
    this.studentService.getAllStudent().subscribe(
      (result) => {
        this.no_of_student = result.data.length;
        
        //console.log("Students" + result.data)
        if (result.status === "Success") {
          // @ts-ignore
          $.showMessage(result.message, 'success')
        }
        this.students = result.data;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 0);
      },
      (error) => { console.error(error) },
      () => {
        this.loaded = true;
      }

    )
  }

  allClasses() {
    this.classsesService.fetchClasses().subscribe(
      (data) => {
        //console.warn(data)
        this.no_of_classes = data.data.length;
        this.classes = data.data;
        // 
      },
      (error) => { console.log(error) },
      () => { console.warn('completed') }
    )
  }


  allDepartments(){
    this.departmentService.getDepartments().subscribe(
      (data) => {
        console.warn(data.data.length)
        this.no_of_departments = data.data.length;
        this.classes = data.data;
        // 
      },
      (error) => { console.log(error) },
      () => { console.warn('completed') }
    )
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  setId(id: any) {
    this.StudentId = id;
   // console.log(this.StudentId);
    this.studentService.findStudentById(id)
      .subscribe(
        (data) => {
          this.first_name = data.data.first_name;
          this.last_name = data.data.last_name;
          this.middle_name = data.data.middle_name;
          this.dob = data.data.dob;
          this.email = data.data.email;
          this.address = data.data.address;
          this.class_id = data.data.class_id;
          this.class_name = data.data.class_name;
          this.gender = data.data.gender;
          console.log(data.data);
        })



  }

  onSubmitEditStudentModal(form: any) {
   // console.log(form.value)
    this.studentService.update(form.value)
      .subscribe(
        (data) => {
          Swal.fire('Success', 'Student Record Updated', 'info')

        },
        (error) => { console.log(error) },
        () => { console.warn('completed') });


  }

  navigate(studentid: any,class_id:any) {
  
    this._router.navigate(["dashboard/school-payment/class/" + class_id+ "/student/" + studentid]);
  
  }
  onSubmitAddStudentModal(form: any) {
    console.log(form.value);
    this.studentService.addStudent(form.value)
      .subscribe(
        (data) => {
          Swal.fire('Success', 'New Student Added!', 'info')

        },
        (error) => { console.log(error) },
        () => { console.warn('completed') });
  }
}
