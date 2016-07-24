import {routes} from "./app.routes";
import {provideStates} from "./decorators";

export function appConfig($urlRouterProvider, $stateProvider, tagsInputConfigProvider) {
    provideStates(routes, $stateProvider);

    $urlRouterProvider.otherwise('/');

    tagsInputConfigProvider
        .setDefaults('tagsInput', {
            placeholder: 'Search tags',
            addFromAutocompleteOnly: true
        })
        .setDefaults('autoComplete', {
            minLength: 1
        })
}
appConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'tagsInputConfigProvider'];
