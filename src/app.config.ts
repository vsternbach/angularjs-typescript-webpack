/**
 * Created by 500tech on 7/14/16.
 */
export const appName = 'app';

export function appConfig($urlRouterProvider, $stateProvider, tagsInputConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('root', {
            url: '/',
            template: `<${appName}></${appName}>`
        });
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
