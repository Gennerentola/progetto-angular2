import { Component, OnInit, NgModule } from '@angular/core';
import { Movie } from 'src/app/interface/movie.interface';
import { HomeVisualizerService } from 'src/app/services/home-visualizer.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
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
<!-- stampe card -->
    <div class="container text-light">
    <div class="d-flex flex-wrap justify-content-around" *ngIf="movies.length > 0; else loading">
        <div *ngFor="let m of movies">
          <div class="card my-2 rounded" style="width: 18rem; heigth: 25vh;" *ngIf="m != undefined">
            <img src="http://image.tmdb.org/t/p/w500/{{m.poster_path}}" class="card-img-top">
            <div class="card-body bg-dark rounded-bottom">
              <div class="row">
                <h5 class="card-title col-10">{{m.title}}</h5>
                <div class="col-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
<!-- caricamento -->
    <ng-template #loading>
        <div class="d-flex justify-content-center" >
            <div>
                <div class="spinner-border text-danger" role="status">
                </div>
            </div>
        </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  movies:Movie[] = []

  movieSub!:Subscription

  error = false

  constructor(private movie:HomeVisualizerService, private authSrv:AuthService) { }

  ngOnInit(): void {

    this.movieSub = this.getMovieList()

  }

  getMovieList() {

    return this.movie.getDataObs().subscribe((res)=>{
      if(res) this.movies = this.movie.getMovies()
      else this.error = true
    })

  }

  esci() {
    this.authSrv.logOut()
  }

}
