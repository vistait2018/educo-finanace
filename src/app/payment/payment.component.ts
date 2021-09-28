import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { StudentBill, Classes, Student, billToPay, AddOrRemove, SchoolSessionAndTernmInfoResponse } from '../../types/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { BillsService } from '../bills.service';
import { ClassesService } from '../classes.service'
import { StudentsService } from '../students.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SchoolSessionAndTermsService } from '../school-session-and-terms.service'
import { PaymentService } from '../payment.service'


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {



  constructor(
    private activatedRoute: ActivatedRoute,
    private billService: BillsService,
    private schoolClassService: ClassesService,
    private studentService: StudentsService,
    private schoolSessionAndTermsService: SchoolSessionAndTermsService,
    private _router: Router,
    private paymentService: PaymentService,
  ) { }

  studentId: any;
  classId: any;
  loaded = false;
  bills: StudentBill[] = []
  compulsorybill: StudentBill[] = []
  generalbill: StudentBill[] = []
  storebill: StudentBill[] = []
  specicificCompulsory: StudentBill[] = [];
  classes: Classes[] = [];
  students: Student[] = [];
  student: any = [];
  id: any;
  bill_id: any;
  bill_amount: any;
  amount_to_pay: any;
  selectedClass = undefined;
  selectedStudent = undefined;
  student_id = undefined;
  findBill: boolean = true;
  enableCheck: boolean = false;
  checkMyBill = false;
  general_bills_id: any;
  payment: any;
  amount: any;
  count = 0;
  billToPay: any = [];
  billIndex = 0;
  payment_options: any;
  receipt_no: any;
  receipt_date: any;
  to_pay = 0;
  disable_checkbox = false;
  bill_total = "0.00";
  bills_to_pay: billToPay[] = [];
  debt: number = 0;
  addOrRemoveGeneralBillFromView = true;
  schoolInfo: any;
  storeAmount: number | undefined;
  remove = false;
  add = false;

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params['studentid'];
    this.classId = this.activatedRoute.snapshot.params['classid'];
    this.getStudentsForDisplayById(this.studentId);
    this.getBillWithStudentId()
    this.getSchoolClasses();
    this.getSchoolinfo();
    console.log(this.compulsorybill)
    console.log(this.studentId, this.classId)
  }


  getBillWithStudentId() {
    if (this.studentId == undefined) {
      Swal.fire('Error', 'The Class Is not available', 'error');
    }
    this.billService.fetchBillByStudentId(this.studentId).subscribe(
      (data) => {
        this.bills = data.data.bills;
        this.debt = data.data.debt;
        this.specicificCompulsory = this.bills.filter(e => e.type === 3);

        this.compulsorybill = this.bills.filter(e => e.type === 1);
        this.compulsorybill = [...this.compulsorybill, ... this.specicificCompulsory]
        this.storebill = this.bills.filter(e => e.type === 2);
        this.generalbill = this.bills.filter(e => e.type === 0);
      },
      (error) => { console.log(error) },
      () => { this.loaded = true; }

    )
  }

  getStudentsForDisplayById(studentId: number) {
    this.studentService.findStudentById(studentId)
      .subscribe((result) => {
        this.student = result.data;

        console.warn(result)
      },
        (error) => { console.warn(error) },
        () => { console.warn('completed') }
      )
  }
  getSchoolClasses() {
    this.schoolClassService.fetchClasses()
      .subscribe((result) => {
        this.classes = result.data;

        console.warn(result)
      },
        (error) => { console.warn(error) },
        () => { console.warn('completed') }
      )
  }

  getSchoolinfo() {
    this.schoolSessionAndTermsService.getSessionTermInfo()
      .subscribe((result) => {
        this.schoolInfo = result.data
        console.warn(this.schoolInfo)
      },
        (error) => { console.warn(error) },
        () => { console.warn('completed') }
      )
  }


  getStudents(id: any) {

    console.log(id);
    this.studentService.getStudentsInClass(id)
      .subscribe((result) => {
        this.students = result.data;
        console.warn(this.students)
      },
        (error) => { console.warn(error) },
        () => { console.warn('completed') }
      )

  }
  onSubmitFindBillForm(form: any) {
    console.log(form.value);
    this.redirectTo("dashboard/school-payment/class/" + form.value.class_id + "/student/" + form.value.student_id);
    // this.ngOnInit();
  }
  onSubmitPayBillForm(form: any) {
    console.log(form.value);
  }

  getStudentBills(e: any) {

  }

  checkThis() {
    this.enableCheck = !this.enableCheck;

  }


  enableButton(bill_id: any, bill_amount: any, bill: StudentBill) {
    let result = undefined;
    this.billIndex++;
    if (this.billToPay.length !== 0) {
      result = this.hasId(this.billToPay, bill_id);

    }

    this.findBill = false;
    if (result) {
      let index = this.billToPay.indexOf(bill);
      this.billToPay.splice(index, 1);
      if (result) this.billIndex--;
    } else {
      this.billToPay.push({
        'id': bill_id,
        'amount': bill_amount,
        'bill_index': this.billIndex
      });

    }

    console.log(this.billToPay);
  }


  hasId(data: any, id: any) {

    // @ts-ignore
    const result = data.some(arr => arr.id === id);
    return result;

  }

  redirectTo(uri: string) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate([uri]));
  }

  onChangeCompulsoryBill(event: any, billid: number,) {
    const bill = this.compulsorybill.filter(e => e.id == billid)[0];
    if (!bill) return;
    let to_pay = Number(event.target.value)
    if (to_pay > bill.balance) {
      Swal.fire('Warning!', 'Amount to pay cannot be greater than balance', 'warning')
      to_pay = 0;
    }
    this.compulsorybill = this.compulsorybill.map(bill => {
      if (bill.id == billid) {
        return {
          ...bill,
          to_pay: to_pay
        }
      } else {
        return bill
      }
    });
  }

  onChangeStoreBill(event: any, billid: number) {
    const bill = this.storebill.filter(e => e.id == billid)[0];
    if (!bill) return;
    let to_pay = Number(event.target.value)
    let bill_quatity = bill.quantity;
    if (bill_quatity == 0) bill_quatity = 1;
    if (bill_quatity == undefined) bill_quatity = 1
    if (to_pay > (bill.balance * bill_quatity)) {
      Swal.fire('Warning!', `Amount to pay cannot be greater than balance maximun of ${bill.balance * bill_quatity} `, 'warning')
      to_pay = 0;
    }

    this.storebill = this.storebill.map(bill => {
      if (bill.id == billid) {
        return {
          ...bill,
          to_pay: to_pay
        }
      } else {
        return bill
      }
    })
  }

  onChangeGeneralBill(event: any, billid: number) {
    const bill = this.generalbill.filter(e => e.id == billid)[0];
    if (!bill) return;
    let to_pay = Number(event.target.value)
    if (to_pay > bill.balance) {
      Swal.fire('Warning!', 'Amount to pay cannot be greater than balance', 'warning')
      to_pay = 0;
    }
    this.generalbill = this.generalbill.map(bill => {
      if (bill.id == billid) {
        return {
          ...bill,
          to_pay: to_pay
        }
      } else {
        return bill
      }
    })
  }

  onVerifyPayment() {
    this.bills_to_pay = [...this.compulsorybill, ...this.storebill, ...this.generalbill].filter(bill => bill.to_pay).map(bill => ({
      name: bill.name,
      amount: bill.to_pay,
      pretty_amount: Number(bill.to_pay).toFixed(2),
      id: bill.id
    }))

    this.bill_total = this.bills_to_pay.reduce((a, b) => a + Number(b.amount), 0).toFixed(2)

    if (this.bills_to_pay.length < 1) {
      Swal.fire('Error', 'You have to enter an amount for one bill', 'error')
    } else {
      // @ts-ignore
      $('#verify-bill').modal('show')
    }


  }

  increaseQuantity(bill: any, quatity: any) {
     this.add = true;
    let quantity = Number(quatity);
    if (quatity >= 0) {
      quatity++;
    } else {
      quatity = 0;
    }
    let index = this.storebill.findIndex(sbill => sbill.id == bill.id);
    this.storebill[index].quantity = quatity;


    let debt = {
      'student_id': this.studentId,
      'school_class_id': this.classId,
      'term_id': this.schoolInfo.term_id,
      'school_session_id': this.schoolInfo.school_session_id,
      'general_bill_id': this.storebill[index].id,
      'quantity': this.storebill[index].quantity,
      'collected': 0,
      'isChecked': false

    };

    this.billService.saveStoreQuantity(this.studentId, this.classId, debt).subscribe(
      (data) => {

        console.log('Saved', data.data);
        this.ngOnInit();
      },
      (error) => {

      },
      () => {
         this.add = false;
      }
    );


    console.log(this.storebill[index]);
  }


  decreaseQuantity(bill: any, quatity: any) {
     this.remove = true;
    let quantity = Number(quatity);
    let quant = 0;
    //console.log( quantity - 1)
    // return

    if (quatity > 1) {
      quant = quatity - 1;
      console.log(quant)
    }
    else {
      return;
    }


    let index = this.storebill.findIndex(sbill => sbill.id == bill.id);
    this.storebill[index].quantity = quant;


    this.storebill[index].amount = (parseFloat(this.storebill[index].amount) * quant).toString();

    console.log(this.storebill[index].amount)

    let debt = {
      'student_id': this.studentId,
      'school_class_id': this.classId,
      'term_id': this.schoolInfo.term_id,
      'school_session_id': this.schoolInfo.school_session_id,
      'general_bill_id': this.storebill[index].id,
      'quantity': this.storebill[index].quantity,
      'collected': 0,
      'isChecked': false

    };

    this.billService.saveStoreQuantity(this.studentId, this.classId, debt).subscribe(
      (data) => {

        // console.log('Saved',data.data);
        this.ngOnInit();
      },
      (error) => {

      },
      () => {
          this.remove = false;
      }
    );




  }

  addGeneralBill(bill: any) {
   this.add = true

    this.addOrRemoveGeneralBillFromView = !this.addOrRemoveGeneralBillFromView;

    //  let index =this.generalbill.findIndex(sbill => sbill.id== bill.id);

    //@ts-ignore
    // this.generalbill[index].isChecked = !this.generalbill[index].isChecked;
    // this.generalbill[index].quantity = 0;
    //console.log( this.generalbill[index])
    this.billService.addGeneralBill(this.studentId, this.classId, bill).subscribe(
      (data) => {
        //@ts-ignore
        let check = data.data;

        this.ngOnInit();
        console.log(this.generalbill);
      },
      (error) => {
        
      },
      () => {
        this.add = false;
        console.log('ready');
      }
    );
  }

  removeGeneralBill(bill: any) {
    this.remove = true;
    this.addOrRemoveGeneralBillFromView = !this.addOrRemoveGeneralBillFromView;

    // let index =this.generalbill.findIndex(sbill => sbill.id== bill.id);

    //@ts-ignore
    //  this.generalbill[index].isChecked = !this.generalbill[index].isChecked;
    this.billService.removeGeneralBill(this.studentId, this.classId, bill).subscribe(
      (data) => {
        //@ts-ignore
        let check = data.data;

        this.ngOnInit();
        console.log(this.generalbill);

      },
      (error) => {

      },
      () => {
        this.remove = false;
        console.log('ready');
      }
    );
  }
  pay() {
    let data: any = this.bills_to_pay.map((p) => ({
      'general_bill_id': p.id,
      'amount_paid': p.amount,
    }))
    let payload = {
      'data': data,
      'transaction_id': this.generateTransactionId()
    }
    this.paymentService.pay(payload, this.studentId).subscribe(
      (data) => {
        Swal.fire('Info!',  `You have Paid ${this.bill_total}`, 'info')
        this.ngOnInit();
        
      },
      (error) => {

      },
      () => {
        console.log('ready');
      }
    );
  }


  generateTransactionId() {
    // always start with a letter (for DOM friendlyness)
    let idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
      // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
      var ascicode = Math.floor((Math.random() * 42) + 48);
      if (ascicode < 58 || ascicode > 64) {
        // exclude all chars between : (58) and @ (64)
        idstr += String.fromCharCode(ascicode);
      }
    } while (idstr.length < 32);

    return (idstr);
  }
}
