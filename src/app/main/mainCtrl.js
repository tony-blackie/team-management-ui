(function() {
    "use strict";

    angular
        .module('awesome-app.main')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'SearchService'];

    function MainCtrl($scope, SearchService) {
        var vm = this;

        angular.extend(vm, {
            deselectAllOtherTeams: deselectAllOtherTeams,
            saveWorkersToService: saveWorkersToService,
            initialize: initialize
        });

        $scope.tabs = [];
        $scope.teams = [];

        $scope.activateTab = function(index) {
            if ($scope.currentActiveTeamIndex) {
                vm.saveWorkersToService($scope.currentActiveTeamIndex);
            }
            SearchService.activateTab(index);
        };

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


        function initialize() {
            $scope.tabs = SearchService.getTabs();
            $scope.teams = SearchService.getTeams();
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

        vm.initialize();
    }
})();