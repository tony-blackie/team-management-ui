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
                        name: "Friends",
                        members: [
                            {
                                name: 'Ross Gellar',
                                job: 'paleonthologist'
                            },
                            {
                                name: 'Chandler Bing',
                                job: 'accountant'
                            },
                            {
                                name: 'Joey Tribiani',
                                job: 'actor'
                            },
                            {
                                name: 'Rachel Green',
                                job: 'fashion designer'
                            },
                            {
                                name: 'Monika Gellar',
                                job: 'shef'
                            },
                            {
                                name: 'Phoebe Buffay',
                                job: 'masseuse'
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
                        name: "True Detective",
                        members: [
                            {
                                name: 'Ray Velcoro',
                                job: 'detective'
                            },
                            {
                                name: 'Frank Semyon',
                                job: 'businessman'
                            },
                            {
                                name: 'Ani Bezzerides',
                                job: 'detective'
                            },
                            {
                                name: 'Paul Woodrugh',
                                job: 'detective'
                            }
                        ],
                        areTeamMembersShown: false
                    }
                ];
            },
            restrict: 'E'
        };

        return directive;
    }
})();
