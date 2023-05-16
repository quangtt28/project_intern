import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {EmployeeAddComponent} from "./employee/employee-add/employee-add.component";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FE';

  constructor(private matDialog: MatDialog, private router: Router, private authService: AuthService) {}

  openDialogAdd(){
    const dialog = this.matDialog.open(EmployeeAddComponent, {
      width: '40%',
      disableClose: false,
      autoFocus:true,
    });

    dialog.afterClosed().subscribe(result =>
    {
      console.log('The dialog was closed');
    });
  }

  public logOut(){
    this.authService.signOut()
    window.localStorage.clear()
    this.router.navigate(['/'])
  }
}
