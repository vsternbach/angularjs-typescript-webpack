import { Component, OnInit } from 'angular-ts-decorators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  template: require('./heroes.component.html'),
  styles: [require('./heroes.component.scss')]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  /*@ngInject*/
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero(name).then(() => this.getHeroes());
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).then();
  }
}
