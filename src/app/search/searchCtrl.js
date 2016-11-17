(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', 'SearchService'];

    function SearchCtrl($scope, SearchService) {
        $scope.isAnyTeamActive = false;

        $scope.$on('chosenTeamMember', function(event, worker) {
            $scope.teamMembers = angular.copy($scope.teamMembers);
            $scope.teamMembers.push(
                {
                    name: worker.name,
                    age: worker.age,
                    job: worker.job,
                    id: worker.id,
                    grade: worker.grade
                }
            );
            $scope.worker = '';
        });

        $scope.$on('changeActiveTeam', function() {
            $scope.teamMembers = angular.copy(SearchService.getWorkers());
            $scope.isAnyTeamActive = !!$scope.teamMembers.length;
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

        $scope.getTypeaheadData();
    }

})();
