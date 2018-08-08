import { Component, OnInit } from 'angular-ts-decorators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  template: require('./hero-search.component.html'),
  styles: [ require('./hero-search.component.scss') ]
})
export class HeroSearchComponent {
  heroes: Hero[];

  /*@ngInject*/
  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.heroService.searchHeroes(term).then(heroes => this.heroes = heroes);
  }
}
