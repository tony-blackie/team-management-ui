(function() {
    angular
        .module('awesome-app.common.features.team-list', [])
        .directive('teamList', teamList);

    function teamList() {
        var directive = {
            templateUrl: '../common/features/team-list/team-list.html',
            link: function(scope, element, attrs) {

                window.scope = scope; //TODO: Remove

                scope.addTeam = function() {
                    if (!scope.teamName) {
                        return;
                    }
                    scope.teams.push(
                        {
                            name: scope.teamName,
                            members: [],
                            areTeamMembersShown: false

                        }
                    );
                };

                scope.showDropdown = function(index) {
                    scope.teams[index].areTeamMembersShown = !scope.teams[index].areTeamMembersShown
                };

                scope.teams = [
                    {
                        name: "Avengers",
                        members: [
                            {
                                name: 'Bruce Wayne',
                                job: 'driver'
                            },
                            {
                                name: 'Harley Quinn',
                                job: 'entertainment manager'
                            }
                        ],
                        areTeamMembersShown: false
                    },
                    {
                        name: "Big Bang",
                        members: [
                            {
                                name: 'Sheldon Cooper',
                                job: 'theoretical physisyst'
                            },
                            {
                                name: 'Leonard Hoffstader',
                                job: 'theoretical physisyst'
                            },
                            {
                                name: 'Radjesh Kootrapali',
                                job: 'theoretical physisyst'
                            },
                            {
                                name: 'Howard Wolowitz',
                                job: 'rocket engineer'
                            }
                        ],
                        areTeamMembersShown: false
                    },
                    {
                        name: "Team One",
                        members: [],
                        areTeamMembersShown: false
                    }
                ];
            },
            restrict: 'E'
        };

        return directive;
    }
})();
