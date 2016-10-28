(function() {
    angular
        .module('awesome-app.common.features.team-list', [])
        .directive('teamList', teamList);

    function teamList() {
        var directive = {
            template: '<div>{{five}}</div>',
            link: function(scope, element, attrs) {
                scope.five = 5;
            },
            restrict: 'E'
        };

        return directive;
    }
})();
