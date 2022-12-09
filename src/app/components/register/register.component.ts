import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-register',
  template: `
       <div class="container w-50 my-5 border rounded p-3 text-light">
    <h2 class="text-center">Registrati</h2>
    <form (ngSubmit)="registrati(f)" #f="ngForm">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nome" ngModel name="nome" #nome="ngModel" required>
          <p *ngIf="nome.invalid && nome.touched" class="alert alert-danger" role="alert">Campo obbligatorio</p>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" ngModel name="email" #email="ngModel" required>
          <p *ngIf="email.invalid && email.touched" class="alert alert-danger" role="alert">Campo obbligatorio</p>
          <p>{{err}}</p>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" ngModel name="password" #password="ngModel" required>
          <p *ngIf="password.invalid && password.touched" class="alert alert-danger" role="alert">Campo obbligatorio</p>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="f.invalid">REGISTRATI</button>
    </form>
  </div>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  err:string|undefined;

  @ViewChild('f', {static: true}) f!: NgForm;

  constructor(private authSrv:AuthService, private r:Router) { }

  ngOnInit(): void {
  }

  registrati(f:NgForm):void {

     let data: User = {
      nome: f.value.nome,
      email: f.value.email,
      password: f.value.password
     }

    console.log(data)
    this.authSrv.registrazione(data).pipe(catchError(err=> {
        this.err = err.error
      throw err
    })).subscribe(res => {
      this.err = undefined
      this.r.navigate(["login"]);
    })
  }

}
