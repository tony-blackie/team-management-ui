(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http'];

    function SearchService($http) {
        var factory = this;

        factory.workers = [];

        angular.extend(factory, {
            getWorkers: getWorkers,
            setWorkers: setWorkers,
            getAllWorkers: getAllWorkers
        });

        return factory;

        function getWorkers() {
            return factory.workers;
        }

        function setWorkers(index, team) {
            factory.workers[index] = team;
        }

        function getAllWorkers() {
            $http.get('/staff.json').then(function(response) {
                console.log(response);
                debugger;
            });
        }
    }
})();