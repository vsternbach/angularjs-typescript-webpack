/**
 * Created by voland on 4/2/16.
 */
import 'angular';
import 'angular-ui-router';

import components from './components/components.module';
import './components/comment/comment.component';
import './components/comment-list/comments.component';

function appConfig ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            template: '<comments></comments>'
        });
}
appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

// configure the main module
angular.module('app', [
    'ui.router',
    components.name
])
.config(appConfig);

// bootstrap angular
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});