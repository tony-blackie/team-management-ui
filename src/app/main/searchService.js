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
        factory.teams = [
            {
                name: "Friends",
                members: [
                    {
                        name: 'Ross Gellar',
                        job: 'paleonthologist'
                    },
                    {
                        name: 'Chandler Bing',
                        job: 'accountant'
                    },
                    {
                        name: 'Joey Tribiani',
                        job: 'actor'
                    },
                    {
                        name: 'Rachel Green',
                        job: 'fashion designer'
                    },
                    {
                        name: 'Monika Gellar',
                        job: 'shef'
                    },
                    {
                        name: 'Phoebe Buffay',
                        job: 'masseuse'
                    }
                ],
                isActive: false
            },
            {
                name: "Big Bang",
                members: [
                    {
                        name: 'Sheldon Cooper',
                        job: 'theoretical physicist'
                    },
                    {
                        name: 'Leonard Hoffstader',
                        job: 'theoretical physicist'
                    },
                    {
                        name: 'Radjesh Kootrapali',
                        job: 'theoretical physicist'
                    },
                    {
                        name: 'Howard Wolowitz',
                        job: 'rocket engineer'
                    }
                ],
                isActive: false
            },
            {
                name: "True Detective",
                members: [
                    {
                        name: 'Ray Velcoro',
                        job: 'detective'
                    },
                    {
                        name: 'Frank Semyon',
                        job: 'businessman'
                    },
                    {
                        name: 'Ani Bezzerides',
                        job: 'detective'
                    },
                    {
                        name: 'Paul Woodrugh',
                        job: 'detective'
                    }
                ],
                isActive: false
            }
        ];

        angular.extend(factory, {
            getWorkers: getWorkers,
            setWorkers: setWorkers,
            getTypeaheadData: getTypeaheadData,
            findItemInArray: findItemInArray,
            getTeams: getTeams,
            setTeams: setTeams
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

        function getTeams() {
            return factory.teams;
        }

        function setTeams(teams) {
            factory.teams = teams;
        }
    }
})();