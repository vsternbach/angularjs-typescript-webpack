/**
 * Created by voland on 4/2/16.
 */
import 'angular';
import 'angular-sanitize';
import 'angular-ui-router';

import services   from './services/services.module';
import components from './components/components.module';
import './components/comment/comment.component.ts';
import './components/comment-list/comments.component.ts';

// configure the main module
angular.module('app', [
    'ngSanitize',
    'ui.router',
    services.name,
    components.name
])
.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            template: '<comments></comments>'
        });
});

// bootstrap angular
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});