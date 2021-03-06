(function() {
    "use strict";

    angular
        .module('awesome-app.main')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http', '$location', '$state'];

    function SearchService($http, $location, $state) {
        var factory = this;

        factory.workers = [];
        factory.isAnyTeamActive = null;
        factory.currentActiveTeamIndex = null;
        factory.tabs = [
            {
                text: "Search",
                isActive: $location.url() === '/search',
                stateName: "main.search"
            },
            {
                text: "List",
                isActive: $location.url() === '/table-list',
                stateName: "main.list"
            }
        ];
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
            setTeams: setTeams,
            getTabs: getTabs,
            activateTab: activateTab,
            deactivateAllTabs: deactivateAllTabs,
            goToState: goToState,
            addTeam: addTeam,
            makeActive: makeActive,
            deselectAllOtherTeams: deselectAllOtherTeams,
            saveWorkersToService: saveWorkersToService,
            saveTeamMembers: saveTeamMembers,
            saveSingleTeamMember: saveSingleTeamMember,
            getCurrentActiveTeamIndex: getCurrentActiveTeamIndex,
            setCurrentActiveTeamIndex: setCurrentActiveTeamIndex,
            deleteMember: deleteMember,
            getActiveTeamMembers: getActiveTeamMembers
        });

        return factory;

        function deleteMember(index) {
            factory.teams[factory.currentActiveTeamIndex].members.splice(index, 1);
        }

        function getActiveTeamMembers(index) {
            return factory.teams[factory.currentActiveTeamIndex].members;
        }

        function getCurrentActiveTeamIndex() {
            return factory.currentActiveTeamIndex;
        }

        function saveSingleTeamMember(member) {
            var alreadyInTeam = factory.findItemInArray(member, factory.teams[factory.currentActiveTeamIndex].members);

            if (!alreadyInTeam) {
                factory.teams[factory.currentActiveTeamIndex].members.push(member);
            }
            factory.setWorkers(factory.teams[factory.currentActiveTeamIndex].members);
        }

        function saveTeamMembers(teamMembers) {
            factory.teams[factory.currentActiveTeamIndex].members = teamMembers;
        }

        function makeActive(index) {
            factory.setCurrentActiveTeamIndex(index);
            factory.teams[index].isActive = !factory.teams[index].isActive;
            factory.deselectAllOtherTeams(index);
            factory.saveWorkersToService(index);
        }

        function setCurrentActiveTeamIndex(index) {
            if (factory.currentActiveTeamIndex !== index) {
                factory.currentActiveTeamIndex = index;
            } else {
                factory.currentActiveTeamIndex = null;
            }
        }

        function deselectAllOtherTeams(index) {
            angular.forEach(factory.teams, function(team, i) {
                if(team.isActive && i !== index) {
                    factory.teams[i].isActive = false;
                }
            });
        }

        function saveWorkersToService(index) {
            factory.setWorkers(factory.teams[index].members);
            factory.isAnyTeamActive = factory.teams.some(function(elem, index, array) {
                return elem.isActive === true;
            });
        }

        function addTeam(teamName) {
            var stringContainsSpecialCharacters = false;
            angular.forEach(teamName.split(''), function(char) {
                if (char.search(/[a-z0-9 ]+/) === -1) {
                    stringContainsSpecialCharacters = true;
                }
            });

            if (!teamName || teamName.length < 1 || stringContainsSpecialCharacters) {
                return;
            }

            factory.teams.push(
                {
                    name: teamName,
                    members: [],
                    isActive: false
                }
            );
        }

        function goToState(stateName) {
            $state.go(stateName);
        }

        function activateTab(index) {
            factory.deactivateAllTabs();
            factory.tabs[index].isActive = true;
            factory.goToState(factory.tabs[index].stateName);
        }

        function deactivateAllTabs() {
            angular.forEach(factory.tabs, function(tab) {
                tab.isActive = false;
            });
        }

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

        function getTabs() {
            return factory.tabs;
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