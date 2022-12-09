import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Login } from 'src/app/interface/login.interface';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
     <div class="container w-50 my-5 border rounded p-3 text-light">
      <h2 class="text-center">Accedi</h2>
    <form (ngSubmit)="login(l)" #l="ngForm">
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" ngModel name="email" #email="ngModel" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" ngModel name="password" #password="ngModel"
                required>
        </div>
        <button type="submit" class="btn btn-primary">ACCEDI</button>
    </form>
    <p class="mt-3">Se non sei ancora registrato <a [routerLink]="'/register'" routerLinkActive="active">clicca
            qui.</a></p>
    <div class="text-center">
        <strong>{{err}}</strong>
    </div>
</div>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  err:string|undefined;

  @ViewChild('l', {static: true}) l!: NgForm;

  constructor(private authSrv:AuthService, private r:Router) { }

  ngOnInit(): void {
  }

  login(l:NgForm){
    let data:Login = {
      email: l.value.email,
      password: l.value.password
    }
    this.authSrv.accedi(data).pipe(catchError(err=> {
      this.err = err.error
    throw err
  })).subscribe(res => {
      this.r.navigate(['home'])
    })
  }

}
