/**
 * Created by voland on 4/2/16.
 */
import * as angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
import 'ng-tags-input';
import { NgModule, NgModuleDecorated } from 'angular-ts-decorators';
import { AppComponent } from './app.component';
import { CommentsModule } from './components/comments/comments.module';
import { routes } from './app.routes';

export interface IComponentState extends ng.ui.IState {
  state: string;
  component?: any;
  views?: { [name: string]: IComponentState };
}

@NgModule({
  name: 'AppModule',
  imports: [
    'ui.router',
    'ngTagsInput',
    'ngSanitize',
    CommentsModule
  ],
  declarations: [
    AppComponent
  ]
})
class AppModule {
  /*@ngInject*/
  public config($urlRouterProvider: ng.ui.IUrlRouterProvider,
                $stateProvider: ng.ui.IStateProvider,
                tagsInputConfigProvider: any) {
    AppModule.provideStates(routes, $stateProvider);

    $urlRouterProvider.otherwise('/');

    tagsInputConfigProvider
      .setDefaults('tagsInput', {
        placeholder: 'Search tags',
        addFromAutocompleteOnly: true
      })
      .setDefaults('autoComplete', {
        minLength: 1
      });
  }

  private static setTemplate(state: IComponentState) {
    const selector = state.component.selector;
    state.template = `<${selector}></${selector}>`;
    delete state.component;
  }

  private static provideStates(states: IComponentState[], $stateProvider: ng.ui.IStateProvider) {
    states.map((config) => {
      const name = config.state;
      const namedState = config.views;
      if (namedState) {
        const namedViews = Object.keys(namedState);
        namedViews.forEach((view) => {
          AppModule.setTemplate(namedState[view]);
        });
      }
      else {
        AppModule.setTemplate(config);
      }
      delete config.state;
      return {name, config};
    }).forEach(state => $stateProvider.state(state.name, state.config));
  }
}

// bootstrap
angular.element(document).ready(() => {
  angular.bootstrap(document, [(<NgModuleDecorated>AppModule).module.name], { strictDi: true });
});
