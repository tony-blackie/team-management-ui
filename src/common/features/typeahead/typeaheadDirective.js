(function() {
    "use strict";

    angular
        .module('awesome-app.common.features.typeahead', ['awesome-app.search'])
        .directive('typeahead', typeahead);

    typeahead.$inject = ['SearchService', '$timeout', '$filter'];

    function typeahead(SearchService, $timeout, $filter) {
        var directive;

        directive =  {
            restrict: 'AEC',
            scope: {
                items: "=",
                title: '@',
                subtitle: '@',
                model: '=',
                onSelect: '&'
            },
            link: function(scope, elem, attrs) {
                scope.handleSelection = function(selectedItem) {
                    scope.current = 0;
                    scope.selected = true;
                    $timeout(function() {
                        scope.onSelect();
                    }, 200);
                    scope.$emit('chosenTeamMember', selectedItem);
                };
                scope.current = 0;
                scope.selected = true; // hides the tableList initially
                scope.isShown = $filter('model')(scope.items);
                scope.isCurrent = function(index) {
                    return scope.current == index;
                };
                scope.setCurrent = function(index) {
                    scope.current = index;
                };
            },
            templateUrl: '../common/features/typeahead/typeahead.html'
        };

        return directive;
    }


})();