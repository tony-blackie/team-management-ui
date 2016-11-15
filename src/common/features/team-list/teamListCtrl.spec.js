(function() {

    describe('awesome-app.search module', function() {
        var $controller,
            $scope,
            controller,
            SearchService,
            currentActiveTeamIndex;

        beforeEach(function () {
            module('awesome-app.search');

            inject(function (_$controller_, _SearchService_) {
                $controller = _$controller_;
                SearchService = _SearchService_;
            });

            $scope = {};
            $scope.$broadcast = function() {};
            $scope.$on = function() {};
            controller = $controller('TeamListCtrl', {$scope: $scope});

            $scope.tabs = [
                {
                    text: 'Search',
                    isActive: true
                },
                {
                    text: 'List',
                    isActive: false
                }
            ];

            currentActiveTeamIndex = 0;
        });

        it('should make element inactive after click if it was active previously', function() {
            $scope.teams = [
                {
                    name: 'team1',
                    members: [],
                    isActive: true
                },
                {
                    name: 'team2',
                    members: [],
                    isActive: false
                }
            ];

            $scope.makeActive(1);

            expect($scope.teams[0].isActive).toBeFalsy();
        });

        it('should call deselectAllOtherTeams when makeActive is called', function() {
            spyOn(controller, 'deselectAllOtherTeams');

            $scope.makeActive(0);

            expect(controller.deselectAllOtherTeams).toHaveBeenCalled();
        });

        it('should make other teams inactive if new one is clicked', function() {
            $scope.teams = [
                {
                    name: 'team1',
                    members: [],
                    isActive: true
                },
                {
                    name: 'team2',
                    members: [],
                    isActive: false
                },
                {
                    name: 'team3',
                    members: [],
                    isActive: false
                }
            ];

            $scope.makeActive(1);

            expect($scope.teams[0].isActive).toBeFalsy();
            expect($scope.teams[1].isActive).toBeTruthy();
            expect($scope.teams[2].isActive).toBeFalsy();
        });

        it('should pass validation and add one team', function() {
            $scope.teams = [
                {
                    name: 'team1',
                    members: [],
                    isActive: true
                },
                {
                    name: 'team2',
                    members: [],
                    isActive: false
                }
            ];

            $scope.teamName = "1337";

            $scope.addTeam();

            expect($scope.teams.length).toBe(3);
        });

        it('should not add extra team if teamName is empty', function() {
            $scope.teams = [
                {
                    name: 'team1',
                    members: [],
                    isActive: true
                },
                {
                    name: 'team2',
                    members: [],
                    isActive: false
                }
            ];

            $scope.teamName = "";

            $scope.addTeam();

            expect($scope.teams.length).toBe(2);
        });

        it('should call set workers on service', function() {
            spyOn(SearchService, 'setWorkers');

            $scope.makeActive(2);

            expect(SearchService.setWorkers).toHaveBeenCalled();
        });

        it('should delete team member', function() {
            $scope.teams = [
                {
                    name: 'Friends',
                    members: [
                        {
                            name: 'Ross Gellar',
                            job: 'paleonthologist'
                        },
                        {
                            name: 'Chandler Bing',
                            job: 'accountant'
                        }
                    ]
                }
            ];

            currentActiveTeamIndex = 0;

            $scope.deleteMember(1);

            expect($scope.teams[0].members.length).toBe(1);
            expect($scope.teams[0].members[1]).not.toBeDefined();
        });
    });
})();