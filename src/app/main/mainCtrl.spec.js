(function() {

    describe('awesome-app.main module', function() {
        var $controller,
            $scope,
            SearchService,
            $rootScope,
            controller,
            $httpBackend,
            $location,
            sandbox,
            $state;

        beforeEach(function () {
            module('awesome-app.main');

            inject(function (_$controller_,
                             _SearchService_,
                             _$rootScope_,
                             _$httpBackend_,
                             _$location_,
                             _$state_) {

                $controller = _$controller_;
                SearchService = _SearchService_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $state = _$state_;
            });

            $scope = $rootScope.$new();
            $scope.$on = function () {
            };
            // controller = $controller('MainCtrl', {$scope: $scope});
            sandbox = sinon.sandbox.create();
        });

        describe('tabs tests', function () {
            it('should initialize $scope.tabs with data', function() {
                var locationStub = sinon.stub($location, 'url');
                locationStub.returns('/table-list');
                spyOn(SearchService, 'getTabs');

                controller = $controller('MainCtrl', {$scope: $scope});

                controller.initialize();

                expect(SearchService.getTabs).toHaveBeenCalled();
            });
        });

        describe('team tests', function() {
            beforeEach(function() {
                controller = $controller('MainCtrl', {$scope: $scope});
            });

            // it('should make element inactive after click if it was active previously', function() {
            //     $scope.teams = [
            //         {
            //             name: 'team1',
            //             members: [],
            //             isActive: true
            //         },
            //         {
            //             name: 'team2',
            //             members: [],
            //             isActive: false
            //         }
            //     ];
            //
            //     $scope.makeActive(1);
            //
            //     expect($scope.teams[0].isActive).toBeFalsy();
            // });

            // it('should call deselectAllOtherTeams when makeActive is called', function() {
            //     spyOn(controller, 'deselectAllOtherTeams');
            //
            //     $scope.makeActive(0);
            //
            //     expect(controller.deselectAllOtherTeams).toHaveBeenCalled();
            // });

            // it('should make other teams inactive if new one is clicked', function() {
            //     $scope.teams = [
            //         {
            //             name: 'team1',
            //             members: [],
            //             isActive: true
            //         },
            //         {
            //             name: 'team2',
            //             members: [],
            //             isActive: false
            //         },
            //         {
            //             name: 'team3',
            //             members: [],
            //             isActive: false
            //         }
            //     ];
            //
            //     $scope.makeActive(1);
            //
            //     expect($scope.teams[0].isActive).toBeFalsy();
            //     expect($scope.teams[1].isActive).toBeTruthy();
            //     expect($scope.teams[2].isActive).toBeFalsy();
            // });

            // it('should pass validation and add one team', function() {
            //     $scope.teams = [
            //         {
            //             name: 'team1',
            //             members: [],
            //             isActive: true
            //         },
            //         {
            //             name: 'team2',
            //             members: [],
            //             isActive: false
            //         }
            //     ];
            //
            //     $scope.teamName = "1337";
            //
            //     $scope.addTeam();
            //
            //     expect($scope.teams.length).toBe(3);
            // });

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

            // it('should delete team member', function() {
            //     $scope.teams = [
            //         {
            //             name: 'Friends',
            //             members: [
            //                 {
            //                     name: 'Ross Gellar',
            //                     job: 'paleonthologist'
            //                 },
            //                 {
            //                     name: 'Chandler Bing',
            //                     job: 'accountant'
            //                 }
            //             ]
            //         }
            //     ];
            //
            //     $scope.currentActiveTeamIndex = 0;
            //
            //     $scope.deleteMember(1);
            //
            //     expect($scope.teams[0].members.length).toBe(1);
            //     expect($scope.teams[0].members[1]).not.toBeDefined();
            // });

            it('should call getTeams on SearchService when controller is initialized', function() {
                spyOn(SearchService, 'getTeams');
                controller.initialize();
                expect(SearchService.getTeams).toHaveBeenCalled();
            });
        });

        describe('tab functionality tests', function() {

            beforeEach(function() {
                controller = $controller('MainCtrl', {$scope: $scope});
                $scope.tabs = [
                    {
                        text: 'Search',
                        isActive: true,
                        stateName: 'main.search'
                    },
                    {
                        text: 'List',
                        isActive: false,
                        stateName: 'main.list'
                    }
                ];
            });

            // it('should call deactivateAllTabs when activateTab is called', function() {
            //     spyOn($scope, 'deactivateAllTabs');
            //
            //     controller.goToState = function() {};
            //
            //     $scope.activateTab(1);
            //
            //     expect($scope.deactivateAllTabs).toHaveBeenCalled();
            // });

            // it('should deactivate all tabs when deactivateAllTabs is called', function() {
            //     $scope.deactivateAllTabs();
            //
            //     expect($scope.tabs[0].isActive).toBe(false);
            //     expect($scope.tabs[1].isActive).toBe(false);
            // });

            // it('should activate tab on click', function() {
            //     controller.goToState = function() {};
            //     $scope.activateTab(1);
            //     expect($scope.tabs).toEqual(
            //         [
            //             {
            //                 text: 'Search',
            //                 isActive: false,
            //                 stateName: 'main.search'
            //             },
            //             {
            //                 text: 'List',
            //                 isActive: true,
            //                 stateName: 'main.list'
            //             }
            //         ]
            //     );
            // });
        });
    });
})();