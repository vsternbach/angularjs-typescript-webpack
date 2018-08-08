import { Component, OnInit } from 'angular-ts-decorators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  template: require('./dashboard.component.html'),
  styles: [ require('./dashboard.component.scss') ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  /*@ngInject*/
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
