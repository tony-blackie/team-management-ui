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
            $scope.teamMembers = SearchService.getWorkers();
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

        $scope.name = '';
        $scope.onItemSelected = function() {
            console.log('selected=' + $scope.name);
        };
    }

})();
