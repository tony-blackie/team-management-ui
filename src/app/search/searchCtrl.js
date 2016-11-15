(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', 'SearchService'];

    function SearchCtrl($scope, SearchService) {

        $scope.tabs = [
            {
                text: "Search",
                isActive: true
            },
            {
                text: "List",
                isActive: false
            }
        ];

        $scope.$on('changeActiveTeam', function() {
            $scope.teamMembers = angular.copy(SearchService.getWorkers());
        });


        $scope.deactivateAllTabs = function() {
            angular.forEach($scope.tabs, function(tab) {
                tab.isActive = false;
            });
        };

        $scope.activateTab = function(index) {
            $scope.deactivateAllTabs();
            $scope.tabs[index].isActive = true;
        };

        SearchService.getTypeaheadData('staff.json').then(function(data) {
            $scope.items = data;
        });

        $scope.worker = '';
        $scope.newTeamMembers = [];
        $scope.onItemSelected = function() {
            $scope.teamMembers = angular.copy($scope.teamMembers);
            $scope.teamMembers.push(
                {
                    name: $scope.worker.name,
                    age: $scope.worker.age,
                    job: $scope.worker.job,
                    id: $scope.worker.id,
                    grade: $scope.worker.grade

                }
            );
            $scope.worker = '';
        };
        $scope.refreshTeamList = function() {
            $scope.$emit('saveTeamMembers', $scope.teamMembers);
        };
    }

})();
