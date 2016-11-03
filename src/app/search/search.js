(function() {
    'use strict';

    angular.module('awesome-app.search', ['ui.router'])
        .config(function config($stateProvider) {
            $stateProvider
                .state('search', {
                    url: '^/search',
                    controller: 'TeamListCtrl',
                    templateUrl: 'search/search.tpl.html'
                })
    });
})();
