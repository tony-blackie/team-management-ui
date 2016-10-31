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

        $scope.activateTab = function(index) {  //TODO: Cover with tests!
            deactivateAllTabs();
            $scope.tabs[index].isActive = true;
        };

        function deactivateAllTabs() {
            angular.forEach($scope.tabs, function(tab) {
                tab.isActive = false;
            });
        }
    }

})();