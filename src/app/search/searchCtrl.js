(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope'];

    function SearchCtrl($scope) {

        $scope.text = 'TitleTitleTitleTitleTitleTitleTitleTitle';

        $scope.changeText = function() {
            $scope.text = 'changed!';
        };
    }

})();