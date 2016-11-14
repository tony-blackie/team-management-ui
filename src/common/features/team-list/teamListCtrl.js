(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('TeamListCtrl', TeamListCtrl);

    TeamListCtrl.$inject = ['$scope', 'SearchService'];

    function TeamListCtrl($scope, SearchService) {
        var vm = this;

        angular.extend(vm, {
            deselectAllOtherTeams: deselectAllOtherTeams,
            saveWorkersToService: saveWorkersToService
        });

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

        function deselectAllOtherTeams(index) {
            angular.forEach($scope.teams, function(team, i) {
                if(team.isActive && i !== index) {
                    $scope.teams[i].isActive = false;
                }
            });
        }

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
            $scope.currentActiveTeamIndex = index;
            $scope.$broadcast('changeActiveTeam');
        };

        $scope.deleteMember = function(index) {
            $scope.teams[$scope.currentActiveTeamIndex].members.splice(1, index);
        };

        function saveWorkersToService(index) {
            SearchService.setWorkers($scope.teams[index].members);
        }
    }
})();
