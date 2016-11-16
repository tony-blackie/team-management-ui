'use strict';

angular.module('awesome-app.list', ['ui.router']).

config(function config($stateProvider) {

    $stateProvider
        .state('list', {
            url: '/list',
            controller: 'ListCtrl',
            templateUrl: 'list/list.tpl.html'
        });
});