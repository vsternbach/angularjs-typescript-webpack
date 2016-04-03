/**
 * Created by voland on 4/2/16.
 */
import 'angular';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ng-tags-input';

import services   from './services/services.module';
import components from './components/components.module';
import './components/comment/comment.component';
import './components/comment-list/comments.component';

// configure the main module
angular.module('app', [
    'ngTagsInput',
    'ngSanitize',
    'ui.router',
    services.name,
    components.name
])
.config(function($urlRouterProvider, $stateProvider, tagsInputConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            template: '<comments></comments>'
        });

    tagsInputConfigProvider
        .setDefaults('tagsInput', {
            placeholder: 'Search tags',
            addFromAutocompleteOnly: true
        })
        .setDefaults('autoComplete', {
            minLength: 1
        })
});

// bootstrap angular
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});