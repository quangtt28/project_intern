import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
// send data to dialog
import { User } from 'src/app/model/user.model';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router, ActivatedRoute} from "@angular/router";
import {Employees} from "../../model/employees.model";
import {EmployeesService} from "../../service/employees.service";
import { EmployeeListComponent } from "../employee-list/employee-list.component";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  public employees: Employees = new Employees()
  formGroup!: FormGroup;

  // element yêu cầu 1 số thành phần mà không cần tải lại trang
  @ViewChild('FirstName') firstnameInput: ElementRef | undefined;
  @ViewChild('LastName') lastnameInput: ElementRef | undefined;
  @ViewChild('Email') emailInput: ElementRef | undefined;

  constructor(
    public dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  public edit(){
    this.employees.firstname = this.firstnameInput?.nativeElement.value
    this.employees.lastname = this.lastnameInput?.nativeElement.value
    this.employees.email = this.emailInput?.nativeElement.value
    console.log(this.employees);

    this.employeesService.updateEmployee(this.data.id, this.employees).subscribe(data =>{
      console.log(data);
      alert("Update thành công!")
    }, error => alert("Lỗi update!"));
  }

  public delete(){
    this.employeesService.deleteEmployee(this.data.id).subscribe(data =>{
      alert("Xóa thành công!")
    }, error => alert("Lỗi delete!"));
  }
}
