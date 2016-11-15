(function() {
    "use strict";

    angular
        .module('awesome-app.common.features.typeahead', ['awesome-app.search'])
        .directive('typeahead', typeahead);

    typeahead.$inject = ['SearchService', '$timeout'];

    function typeahead(SearchService, $timeout) {
        var directive;

        directive =  {
            restrict: 'AEC',
            scope: {
                items: "=",
                prompt: '@',
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
                scope.selected = true; // hides the list initially
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