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

        $scope.$on('removeTeamMember', function(event, members) {
            $scope.teamMembers = members;
        });

        $scope.refreshTeamList = function() {
            $scope.$emit('saveTeamMembers', $scope.teamMembers);
        };
    }

})();
