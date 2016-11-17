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
            getAllWorkers: getAllWorkers,
            getTypeaheadData: getTypeaheadData,
            findItemInArray: findItemInArray
        });

        return factory;

        function getWorkers() {
            return factory.workers;
        }

        function setWorkers(team) {
            var isEqual = true;

            if (!factory.workers.length || factory.workers.length !== team.length) {
                factory.workers = team;
                return;
            }

            angular.forEach(factory.workers, function(worker, i) {
                if (worker && team && worker.name !== team[i].name) {
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

        function getTypeaheadData(url) {
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findItemInArray(item, array) {
            var alreadyInArray = false;

            angular.forEach(array, function(arrayElement) {
                if (item.name === arrayElement.name) {
                    alreadyInArray = true;
                }
            });

            return alreadyInArray;
        }
    }
})();