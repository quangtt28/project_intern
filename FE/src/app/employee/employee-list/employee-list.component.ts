import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import { Data } from 'popper.js';
import {Employees} from "../../model/employees.model";
import {AuthService} from "../../service/auth.service";
import {EmployeesService} from "../../service/employees.service";
import {EmployeeAddComponent} from "../employee-add/employee-add.component";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  @ViewChild('id') employeeId: ElementRef | undefined;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  public arrayEmployee: Employees[] = [];
  public array: Employees[]=[];
  public employees: Employees = new Employees();
  public pageSize = [5];

  constructor(
    private matDialog: MatDialog,
    private employeesService: EmployeesService,
    private router: Router,
    private authService: AuthService,) {}

  ngOnInit() {
    this.getAll()
  }

  public reloadList(){
    console.log('reload');
    window.location.reload();
  }

  public getAll(){
    this.employeesService.getAllEmployee().subscribe(data =>{
      this.arrayEmployee = data
      this.dataSource = new MatTableDataSource<Employees>(this.arrayEmployee);
      this.ngAfterViewInit()
      console.log(this.arrayEmployee);
    }, error => alert("Không có employee!"));
  }

  public getById(){
    if (this.employeeId?.nativeElement.value == ''){
      this.getAll()
    }else {
      this.employeesService.getEmployeeById(this.employeeId?.nativeElement.value).subscribe(data =>{
        this.array.push(data)
        this.dataSource = new MatTableDataSource<Employees>(this.array);
        console.log(this.array);
      }, error => alert("Không tìm thấy employee!"));
    }
  }

  public exportReport(){
    this.employeesService.report().subscribe(data => {
      alert("Đã xuất báo cáo!")
    }, error => alert("Đã xuất báo cáo!"));
  }

  openDialogAdd(){
    const dialog = this.matDialog.open(EmployeeAddComponent, {
      width: '40%',
      disableClose: false,
      autoFocus:true,
    });

    dialog.afterClosed().subscribe(result => {
      console.log('ADD');
      this.getAll()
    });
  }

  openDialogEdit(row: Employees){
    const dialog = this.matDialog.open(EmployeeEditComponent, {
      width: '40%',
      disableClose: false,
      autoFocus:true,
      data: row
    });

    dialog.afterClosed().subscribe(result => {
      console.log('EDIT');
      this.getAll()
    });
  }

  displayedColumns: string[] = ['id','firstname','lastname','email'];
  dataSource = new MatTableDataSource<Employees>(this.arrayEmployee);

  ngAfterViewInit(){
    this.dataSource.paginator = this.matPaginator;
  }

  clickedRows = new Set<Employees>();
}
