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

        function setWorkers(team) {
            var isEqual = true;

            if (!factory.workers.length) {
                factory.workers = team;
                return;
            }

            angular.forEach(factory.workers, function(worker, i) {
                console.log(worker.name);
                console.log(team[i].name);
                if (worker.name !== team[i].name) {
                    isEqual = false;
                }
            });

            factory.workers = isEqual ? [] : team;
        }

        function getAllWorkers() {
            $http.get('/staff.json').then(function(response) {
                console.log(response);
            });
        }
    }
})();