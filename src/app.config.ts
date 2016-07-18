export const appName = 'app';

export function appConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/films');
    $stateProvider
        .state('app', {
            abstract: true,
            template: `<${appName}></${appName}>`
        })
        .state('app.list', {
            url: '/:type',
            template: `<list></list>`
        });
}
appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
