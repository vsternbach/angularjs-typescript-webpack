import * as angular from 'angular';
import { NgModuleDecorated } from 'angular-ts-decorators';
import { AppModule } from './main';

angular.element(document).ready(() => {
  angular.bootstrap(document, [(<NgModuleDecorated>AppModule).module.name], {strictDi: true});
});
