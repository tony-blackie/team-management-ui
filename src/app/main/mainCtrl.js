(function() {
    "use strict";

    angular
        .module('awesome-app.main')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$location', 'SearchService'];

    function MainCtrl($scope, $location, SearchService) {
        var vm = this;

        angular.extend(vm, {
            deselectAllOtherTeams: deselectAllOtherTeams,
            saveWorkersToService: saveWorkersToService,
            goToUrl: goToUrl
        });

        $scope.tabs = [
            {
                text: "Search",
                isActive: true,
                url: "/search"
            },
            {
                text: "List",
                isActive: false,
                url: "/table-list"
            }
        ];

        $scope.deactivateAllTabs = function() {
            angular.forEach($scope.tabs, function(tab) {
                tab.isActive = false;
            });
        };

        $scope.activateTab = function(index) {
            $scope.deactivateAllTabs();
            $scope.tabs[index].isActive = true;
            vm.goToUrl($scope.tabs[index].url);
        };

        $scope.teams = [
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

        $scope.currentActiveTeamIndex = null;

        $scope.addTeam = function() {
            var stringContainsSpecialCharacters = false;
            angular.forEach($scope.teamName.split(''), function(char) {
                if (char.search(/[a-z0-9 ]+/) === -1) {
                    stringContainsSpecialCharacters = true;
                }
            });

            if (!$scope.teamName || $scope.teamName.length < 1 || stringContainsSpecialCharacters) {
                return;
            }

            $scope.teams.push(
                {
                    name: $scope.teamName,
                    members: [],
                    isActive: false
                }
            );
        };

        $scope.makeActive = function(index) {
            $scope.teams[index].isActive = !$scope.teams[index].isActive;
            vm.deselectAllOtherTeams(index);
            vm.saveWorkersToService(index);
            $scope.$broadcast('changeActiveTeam');
        };

        $scope.deleteMember = function(index) {
            $scope.teams[$scope.currentActiveTeamIndex].members.splice(index, 1);
            $scope.$broadcast('removeTeamMember', $scope.teams[$scope.currentActiveTeamIndex].members);
        };

        function saveWorkersToService(index) {
            SearchService.setWorkers($scope.teams[index].members);
            SearchService.isAnyTeamActive = $scope.teams.some(function(elem, index, array) {
                return elem.isActive === true;
            });
            $scope.currentActiveTeamIndex = index;
        }

        function deselectAllOtherTeams(index) {
            angular.forEach($scope.teams, function(team, i) {
                if(team.isActive && i !== index) {
                    $scope.teams[i].isActive = false;
                }
            });
        }

        function goToUrl(url) {
            $location.url(url);
        }

        $scope.$on('saveTeamMembers', function(event, teamMembers) {
            $scope.teams[$scope.currentActiveTeamIndex].members = teamMembers;
        });

        $scope.$on('saveSingleTeamMember', function(event, member) {
            var alreadyInTeam = SearchService.findItemInArray(member, $scope.teams[$scope.currentActiveTeamIndex].members);

            if (!alreadyInTeam) {
                $scope.teams[$scope.currentActiveTeamIndex].members.push(member);
            }
        });
    }
})();