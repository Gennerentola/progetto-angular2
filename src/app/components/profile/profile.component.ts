import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
  <!-- navbar -->
    <div class="container-fluid bg-danger mb-4">
      <nav class="navbar d-flex justify-content-between">
        <div>
          <a class="navbar-brand" [routerLink]="['/home']" routerLinkActive="home" [routerLinkActiveOptions]="{exact: true}">Fakeflix</a>
          <a class="text-black text-decoration-none" [routerLink]="['/profilo']" routerLinkActive="profilo">Profilo</a>
        </div>
        <a class="text-black text-decoration-none" (click)="esci()">Esci</a>
      </nav>
    </div>
  <!-- Info profilo -->
  <div class="my-4 text-center text-light">
    <p>{{"Nome: " + user.user.nome}}</p>
    <p>{{"Email: " + user.user.email}}</p>
  </div>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: any = [];
  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
    let userLogged:any = localStorage.getItem("user");
    this.user = JSON.parse(userLogged)
  }

  esci() {
    this.authSrv.logOut()
  }

}
