import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

const AUTH_API = 'http://localhost:8080/api/auth/';
// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type':'application/json'})
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient) {}

  getAuthorizationToken(): string {
    const token = window.localStorage.getItem('token');
    if (token!=null){
      return token;
    }
    return '';
  }

  signIn(user: User): Observable<any>{
    return this.http.post(AUTH_API + 'signin', user,{responseType: 'json'})
  }

  signOut(){
    return this.http.post(AUTH_API + 'signout', null)
  }
}
