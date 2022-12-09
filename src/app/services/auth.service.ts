import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interface/auth-response.interface';
import { User } from '../interface/user.interface';
import { Login } from '../interface/login.interface';
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService()
  private authSubj = new BehaviorSubject<null | AuthResponse>(null);
  user$ = this.authSubj.asObservable();

  constructor(private http:HttpClient, private router:Router) { }

  userUrl = "http://localhost:3000/register"
  loginUrl= "http://localhost:3000/login"

  registrazione(data:User) {
    return this.http.post<AuthResponse>(this.userUrl, data).pipe(catchError(err=>{
      throw err
    }))
  }

  accedi(data:Login){
    return this.http.post<AuthResponse>(this.loginUrl, data).pipe(catchError(err =>{
      console.log(err);
      throw err;
    }), tap((res)=> {
      this.authSubj.next(res)
      localStorage.setItem("user", JSON.stringify(res))
      localStorage.setItem("id", JSON.stringify(res.user.id))
    }))
  }

  logOut() {
    this.authSubj.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

}
