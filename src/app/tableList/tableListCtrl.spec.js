(function() {

    describe('tableList Controller', function() {
        var $controller,
            $scope,
            controller,
            SearchService,
            $rootScope;

        beforeEach(function () {
            module('awesome-app.search');

            inject(function (_$controller_,
                             _SearchService_,
                             _$rootScope_) {
                $controller = _$controller_;
                SearchService = _SearchService_;
                $rootScope = _$rootScope_;
            });

            $scope = $rootScope.$new();
            $scope.$broadcast = function () {};
            $scope.$on = function () {};
            controller = $controller('TableListCtrl', {$scope: $scope});
        });

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        it('should call getTypeaheadData', function() {
            spyOn(SearchService, 'getTypeaheadData')
                .and.returnValue({then: function() {}});

            $scope.getTypeaheadData();

            expect(SearchService.getTypeaheadData).toHaveBeenCalled();
        });

        describe('tests for showTooltip', function() {
            it('should changeTooltip flag', function() {
                $scope.items = [
                    {
                        isTooltipShown: false
                    },
                    {
                        isTooltipShown: false
                    },
                    {
                        isTooltipShown: false
                    }
                ];

                $scope.showWorkerTooltip(2);

                expect($scope.items[2].isTooltipShown).toBe(true);
            });
        });

        describe('tests for hideTooltip', function() {
            it('should changeTooltip flag', function() {
                $scope.items = [
                    {
                        isTooltipShown: false
                    },
                    {
                        isTooltipShown: true
                    },
                    {
                        isTooltipShown: false
                    }
                ];

                $scope.hideWorkerTooltip(1);

                expect($scope.items[1].isTooltipShown).toBe(false);
            });
        });

        describe('addTeamMember tests', function() {

            it('should call findItemInArray', function() {
                spyOn(SearchService, 'findItemInArray');
                $scope.items = [{}, {name: 'Matz'}];
                $scope.teamMembers = [{name: 'Doug'}];

                $scope.addTeamMember(1);

                expect(SearchService.findItemInArray).toHaveBeenCalledWith({name: 'Matz'}, [{name: 'Doug'}]);
            });

            it('should add item to teamMembers array', function() {
                spyOn(SearchService, 'findItemInArray').and.returnValue(false);
                $scope.items = [{}, {name: 'Matz'}];
                $scope.teamMembers = [{name: 'Doug'}];

                $scope.addTeamMember(1);

                expect($scope.teamMembers).toEqual([{name: 'Doug'}, {name: 'Matz'}]);
            });

            it('should not add iteam if it is already in array', function() {
                spyOn(SearchService, 'findItemInArray').and.returnValue(true);
                $scope.items = [{}, {name: 'Matz'}];
                $scope.teamMembers = [{name: 'Doug'}];

                $scope.addTeamMember(1);

                expect($scope.teamMembers).toEqual([{name: 'Doug'}]);
            });

            it('should call saveSingleTeamMember', function() {
                spyOn($scope, 'saveSingleTeamMember');
                $scope.items = [{}, {name: 'Matz'}];
                $scope.teamMembers = [{name: 'Doug'}];

                $scope.addTeamMember(1);

                expect($scope.saveSingleTeamMember).toHaveBeenCalledWith(1);
            });
        });

        describe('test for saveSingleTeamMember', function() {

            it('should emit saveSingleTeamMember event', function() {
                spyOn($scope, '$emit');
                $scope.items = [{}, {name: 'Ernest', isFeedbackShown: true}];

                $scope.saveSingleTeamMember(1);

                expect($scope.$emit).toHaveBeenCalledWith(
                    'saveSingleTeamMember',
                    {name: 'Ernest', isFeedbackShown: false}
                );
            });

            it('should toggle isFeedbackShown item if it is false', function() {
                spyOn($scope, '$emit');
                $scope.items = [{}, {name: 'Ernest', isFeedbackShown: false}];

                $scope.saveSingleTeamMember(1);

                expect($scope.$emit).toHaveBeenCalledWith(
                    'saveSingleTeamMember',
                    {name: 'Ernest', isFeedbackShown: true}
                );
            });

            it('should not break if isFeedbackShown flag is not defined', function() {
                spyOn($scope, '$emit');
                $scope.items = [{}, {name: 'Ernest'}];

                $scope.saveSingleTeamMember(1);

                expect($scope.$emit).toHaveBeenCalledWith(
                    'saveSingleTeamMember',
                    {name: 'Ernest'}
                );
            });
        });
    });
})();
