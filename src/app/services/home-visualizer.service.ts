import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from '../interface/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeVisualizerService {

  movies: Movie[] = [];
  dataSubj = new ReplaySubject<boolean>()
  dataObs = this.dataSubj.asObservable()

  constructor(private http:HttpClient) { }

  getDataObs() {
    return this.dataObs
  }

  getData() {
    return this.http.get<Movie[]>("http://localhost:3000/movies-popular").pipe(catchError((err)=>{
      this.dataSubj.next(false)
      throw new Error("GET fallita")
    }));
  }

  getMovies() {
    return this.movies
  }

  fetchData() {
    this.getData().subscribe((res)=>{
      this.movies = res
      this.dataSubj.next(true);
      console.log(this.movies);
    })
  }


}
