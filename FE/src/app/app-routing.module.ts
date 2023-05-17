import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {HeaderFooterComponent} from "./header-footer/header-footer.component";
import {LoginComponent} from "./login/login.component";
import {EmployeeAddComponent} from "./employee/employee-add/employee-add.component";
import {EmployeeListComponent} from "./employee/employee-list/employee-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'header-footer', component: HeaderFooterComponent},
  {path: 'list', component: EmployeeListComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
