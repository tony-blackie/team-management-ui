(function() {
    angular
        .module('awesome-app.common.features.team-list', [])
        .directive('teamList', teamList);

    function teamList() {
        var directive = {
            templateUrl: '../common/features/team-list/team-list.html',
            link: function(scope, element, attrs) {
                scope.teams = [
                    {
                        name: "Team One"
                    },
                    {
                        name: "Avengers"
                    },
                    {
                        name: "Suicide Squad"
                    }
                ];
            },
            restrict: 'E'
        };

        return directive;
    }
})();
