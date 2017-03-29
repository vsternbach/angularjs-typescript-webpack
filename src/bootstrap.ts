import * as angular from 'angular';
import { NgModuleDecorated } from 'angular-ts-decorators';
import { OAuth } from './auth';
import { AppModule } from './main';

const apiKey = 'AIzaSyDj08_wCkkDOBE0BwXI8poNZx08w_ViYS8';
const clientId = '514763995828-compute@developer.gserviceaccount.com';
const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];
const scope = 'https://www.googleapis.com/auth/tasks';

window['bootstrap'] = () => {
  const auth = new OAuth({ apiKey, discoveryDocs, clientId, scope});
  auth.on('gapi.auth2.isSignedIn', (isSignedIn) => {
    if (isSignedIn) {
      // bootstrap
      angular.element(document).ready(() => {
        angular.bootstrap(document, [(<NgModuleDecorated>AppModule).module.name], {strictDi: true});
      });
    }
  });
};
