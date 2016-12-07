(function() {
    "use strict";

    angular
        .module('awesome-app.main')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'SearchService'];

    function MainCtrl($scope, SearchService) {
        var vm = this;

        angular.extend(vm, {
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

        $scope.currentActiveTeamIndex = SearchService.getCurrentActiveTeamIndex();

        $scope.addTeam = function() {
            SearchService.addTeam($scope.teamName);
        };

        $scope.makeActive = function(index) {
            SearchService.makeActive(index);
            $scope.$broadcast('changeActiveTeam');
        };

        $scope.deleteMember = function(index) {
            SearchService.deleteMember(index);
            var teamMembers = SearchService.getActiveTeamMembers();
            $scope.$broadcast('removeTeamMember', teamMembers);
        };

        function saveWorkersToService(index) {
            SearchService.saveWorkersToService(index);
            $scope.currentActiveTeamIndex = index;
        }

        function initialize() {
            $scope.tabs = SearchService.getTabs();
            $scope.teams = SearchService.getTeams();
        }

        $scope.$on('saveTeamMembers', function(event, teamMembers) {
            SearchService.saveTeamMembers(teamMembers);
        });

        $scope.$on('saveSingleTeamMember', function(event, member) {
            SearchService.saveSingleTeamMember(member);
        });

        vm.initialize();
    }
})();