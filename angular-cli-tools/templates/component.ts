import { Component, OnInit } from 'angular-ts-decorators';

@Component({
    selector: '$selectorPrefix$$kebabCaseName$',
    template: require('./$name$.html'),
    styles: [require('./$name$.scss')],
})
export class $PascalCaseName$Component implements OnInit {

  /*@ngInject*/
  constructor() { }

  ngOnInit() { }
}
