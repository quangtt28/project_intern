import {Component, OnInit} from '@angular/core';
import {Employees} from "../../model/employees.model";
import {EmployeesService} from "../../service/employees.service";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  public employee: Employees = new Employees()

  constructor(private employeesService: EmployeesService) {}

  public insert(){
    console.log(this.employee);
    this.employeesService.insertEmployee(this.employee).subscribe(data =>{
      console.log(data);
      alert("Thêm employee thành công!")
    }, error => alert("Lỗi không thêm được!"));
  }
}
