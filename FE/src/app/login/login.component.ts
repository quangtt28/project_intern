import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";
import {EmployeesService} from "../service/employees.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    private employeeService: EmployeesService
  ) {}

  public signin(){
    console.log(this.user);
    this.authService.signIn(this.user).subscribe(data =>{
      console.log(data.accessToken);

      window.localStorage.setItem('token', data.accessToken);
      this.router.navigate(['/list']);
    }, error => alert("Username or password không đúng!")
    )
  }
}
