(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('TableListCtrl', TableListCtrl);

    TableListCtrl.$inject = ['$scope', 'SearchService', '$location'];

    function TableListCtrl($scope, SearchService, $location) {
        $scope.isAnyTeamActive = SearchService.isAnyTeamActive;
        $scope.items = [];

        $scope.getTypeaheadData = function() {
            SearchService.getTypeaheadData('staff.json').then(function(data) {
                $scope.items = data;
            });
        };

        $scope.saveSingleTeamMember = function(index) {
            $scope.$emit('saveSingleTeamMember', $scope.items[index]);
            if ($scope.items[index].isFeedbackShown || $scope.items[index].isFeedbackShown === false) {
                $scope.items[index].isFeedbackShown = !$scope.items[index].isFeedbackShown;
            }
        };

        $scope.addTeamMember = function(index) {
            var alreadyInTeam = SearchService.findItemInArray($scope.items[index], $scope.teamMembers);
            $scope.teamMembers = angular.copy($scope.teamMembers);

            if (!alreadyInTeam) {
                $scope.teamMembers.push($scope.items[index]);
            }

            $scope.saveSingleTeamMember(index);
        };

        $scope.showWorkerTooltip = function(index) {
            $scope.items[index].isTooltipShown = true;
        };

        $scope.hideWorkerTooltip = function(index) {
            $scope.items[index].isTooltipShown = false;
        };

        $scope.$on('changeActiveTeam', function() {
            $scope.teamMembers = angular.copy(SearchService.getWorkers());
            $scope.isAnyTeamActive = SearchService.isAnyTeamActive;
        });

        $scope.getTypeaheadData();
    }
})();

