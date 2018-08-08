import { StateProvider } from '@uirouter/angularjs';
import { Ng1StateDeclaration } from '@uirouter/angularjs/lib/interface';
import { getTypeName, NgModule } from 'angular-ts-decorators';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';

import './styles.css';

export interface UiState extends Ng1StateDeclaration {
  component?: any;
}

const routes: UiState[] = [
  { name: 'index', url: '', redirectTo: 'dashboard' },
  { name: 'dashboard', url: '/dashboard', component: DashboardComponent },
  { name: 'detail', url: '/detail/{id}', component: HeroDetailComponent },
  { name: 'heroes', url: '/heroes', component: HeroesComponent }
];

@NgModule({
  imports: [
    'ui.router'
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [
    { provide: 'heroService', useClass: HeroService },
    { provide: 'messageService', useClass: MessageService }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  static config($stateProvider: StateProvider) {
    'ngInject';
    routes.forEach((route) => $stateProvider.state(getNg1StateDeclaration(route)));
  }
}

function getNg1StateDeclaration(state: UiState) {
  if (state.component && typeof state.component !== 'string') {
    state.component = getTypeName(state.component);
  }
  return state;
}
