import {Injectable, OnInit, ErrorHandler} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user.model";
import {Employees} from "../model/employees.model";
import {AuthService} from "./auth.service";
import {catchError, throwError} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/employees/';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService{
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  constructor(
    private http: HttpClient,
    // private authService: AuthService
  ) {}

  // public setHeaders():any{
  //   let token = `Bearer ${this.authService.getAuthorizationToken()}`
  //   console.log('token:  ',token);
  //   const headers = new HttpHeaders().set('Authorization',token)
  //   console.log('headers:  ' ,headers);
  //   return headers
  // }

  public insertEmployee(employee: Employees): Observable<any>{
    // const headers = this.setHeaders()
    // return this.http.post<any>(AUTH_API + 'insert',employee,{headers, responseType: 'json'});
    return this.http.post<any>(AUTH_API + 'insert',employee,{responseType: 'json'});
  }

  public getAllEmployee(): Observable<any>{
    // const headers = this.setHeaders()
    // return this.http.get<any>(AUTH_API + 'all',{headers, responseType: 'json'});
    return this.http.get<any>(AUTH_API + 'all',{responseType: 'json'});
  }

  public getEmployeeById(id: any): Observable<any>{
    // const headers = this.setHeaders()
    // return this.http.get<any>(AUTH_API + id,{headers, responseType: 'json'});
    return this.http.get<any>(AUTH_API + id,{responseType: 'json'});
  }

  public updateEmployee(id: any, employee: Employees): Observable<any> {
    // const headers = this.setHeaders()
    console.log(employee);
    console.log(AUTH_API + id);
    return this.http.put<any>(AUTH_API + id, employee,{
      // headers,
      responseType:'json'
    });
  }


  public deleteEmployee(id: any): Observable<any>{
    // const headers = this.setHeaders()
    // return this.http.delete<any>(AUTH_API + id,{headers, responseType: 'json'});
    return this.http.delete<any>(AUTH_API + id,{responseType: 'json'});
  }

  public report(){
    // const headers = this.setHeaders()
    console.log(AUTH_API + 'report/05/2023');
    const fileUrl =  AUTH_API + 'report/05/2023';

    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'emloyees.pdf'); // Set the desired file name
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
    // return this.http.get<any>(AUTH_API + 'report/05/2023',{headers, responseType: 'text' as 'json'});
    return this.http.get<any>(AUTH_API + 'report/05/2023',{responseType: 'text' as 'json'});
  }
}

