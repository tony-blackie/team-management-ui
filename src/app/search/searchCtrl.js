(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', 'SearchService'];

    function SearchCtrl($scope, SearchService) {
        $scope.isAnyTeamActive = false;

        $scope.$on('chosenTeamMember', function(event, worker) {
            var alreadyInTeam = SearchService.findItemInArray(worker, $scope.teamMembers);
            $scope.teamMembers = angular.copy($scope.teamMembers);

            if (!alreadyInTeam) {
                $scope.teamMembers.push(
                    {
                        name: worker.name,
                        age: worker.age,
                        job: worker.job,
                        id: worker.id,
                        grade: worker.grade,
                        isTooltipShown: false
                    }
                );
                $scope.worker = '';
            }
        });

        $scope.tooltipsShown = [];

        $scope.$on('changeActiveTeam', function() {
            $scope.teamMembers = angular.copy(SearchService.getWorkers());
            $scope.isAnyTeamActive = SearchService.isAnyTeamActive;
        });

        $scope.$on('removeTeamMember', function(event, members) {
            $scope.teamMembers = members;
        });

        $scope.refreshTeamList = function() {
            $scope.$emit('saveTeamMembers', $scope.teamMembers);
        };

        $scope.getTypeaheadData = function() {
            SearchService.getTypeaheadData('staff.json').then(function(data) {
                $scope.items = data;
            });
        };

        $scope.removeTeamMember = function(index) {
            $scope.teamMembers = angular.copy($scope.teamMembers);
            $scope.teamMembers.splice(index, 1);
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

        $scope.showTooltip = function(index) {
            $scope.teamMembers[index].isTooltipShown = true;
        };

        $scope.hideTooltip = function(index) {
            $scope.teamMembers[index].isTooltipShown = false;
        };

        $scope.getTypeaheadData();
    }

})();
