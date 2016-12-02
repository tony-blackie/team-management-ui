(function() {
    'use strict';

    angular.module('awesome-app.search', ['ui.router'])
        .config(function config($stateProvider) {
            $stateProvider
                .state('main', {
                    controller: 'TeamListCtrl',
                    templateUrl: 'search/main.tpl.html'
                })
                .state('main.search', {
                    controller: 'SearchCtrl',
                    templateUrl: 'search/search.tpl.html'
                })
                .state('main.list', {
                    controller: 'ListCtrl',
                    templateUrl: 'tableList/table-list.tpl.html'
                });
    });
})();
