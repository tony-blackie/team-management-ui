(function() {
    "use strict";

    angular
        .module('awesome-app.common.features.tooltip', [])
        .directive('tooltip', tooltip);

    tooltip.$inject = ['$compile'];

    function tooltip($compile) {
        var directive;

        directive = {
            restrict: 'AE',
            templateUrl: '../common/features/tooltip/tooltip.html',
            scope: {
                grade: '=',
                job: '=',
                search: '@'
            },
            link: function(scope, elem, attrs) {

            }
        };

        return directive;
    }
})();