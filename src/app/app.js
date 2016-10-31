'use strict';

angular.module('awesome-app', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'templates-app',
    'awesome-app.common',
    'awesome-app.home',
    'awesome-app.about',
    'awesome-app.search'
]).
config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
}]);
