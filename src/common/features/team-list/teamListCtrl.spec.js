(function() {

    describe('awesome-app.search module', function() {
        var $controller,
            $scope,
            controller;

        beforeEach(function () {
            module('awesome-app.search');

            inject(function (_$controller_) {
                $controller = _$controller_;
            });

            $scope = {};
            $scope.$broadcast = function() {};
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
            ]
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
    });
})();