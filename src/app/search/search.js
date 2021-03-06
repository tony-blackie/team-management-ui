(function() {
    'use strict';

    angular.module('awesome-app.search', ['ui.router', 'awesome-app.main'])
        .config(function config($stateProvider) {
            $stateProvider
                .state('main', {
                    controller: 'MainCtrl',
                    templateUrl: 'main/main.tpl.html'
                })
                .state('main.search', {
                    url: '/search',
                    controller: 'SearchCtrl',
                    templateUrl: 'search/search.tpl.html'
                })
                .state('main.list', {
                    url: '/table-list',
                    controller: 'TableListCtrl',
                    templateUrl: 'tableList/table-list.tpl.html'
                });
    });
})();
