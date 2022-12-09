import { Component } from '@angular/core';
import { HomeVisualizerService } from './services/home-visualizer.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'movies';
  constructor (private homeSrv:HomeVisualizerService) {}

  ngOnInit () {
    this.homeSrv.fetchData();
  }
}
