(function() {
    "use strict";

    angular
        .module('awesome-app.main')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http'];

    function SearchService($http) {
        var factory = this;

        factory.workers = [];
        factory.isAnyTeamActive = null;

        angular.extend(factory, {
            getWorkers: getWorkers,
            setWorkers: setWorkers,
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

            factory.workers = team;
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