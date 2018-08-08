import { StateService } from '@uirouter/angularjs';
import { IHttpResponse } from 'angular';
import { Component, Input, OnInit } from 'angular-ts-decorators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  template: require('./hero-detail.component.html'),
  styles: [ require('./hero-detail.component.scss') ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  /*@ngInject*/
  constructor(
    private $state: StateService,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.$state.params.id;
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack(): void {
    this.$state.go('dashboard');
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .then(() => this.goBack());
  }
}
