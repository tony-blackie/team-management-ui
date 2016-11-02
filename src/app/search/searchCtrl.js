(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope'];

    function SearchCtrl($scope) {

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

        $scope.deactivateAllTabs = function() {
            angular.forEach($scope.tabs, function(tab) {
                tab.isActive = false;
            });
        };

        $scope.activateTab = function(index) {  //TODO: Cover with tests!
            $scope.deactivateAllTabs();
            $scope.tabs[index].isActive = true;
        };
    }

})();
