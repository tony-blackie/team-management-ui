(function() {

    describe('awesome-app.search module', function() {
        var $controller,
            $scope,
            SearchService,
            $rootScope,
            controller,
            $httpBackend;

        beforeEach(function() {
            module('awesome-app.search');

            inject(function(_$controller_, _SearchService_, _$rootScope_, _$httpBackend_) {
                $controller = _$controller_;
                SearchService = _SearchService_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
            });

            $scope = $rootScope.$new();
            $scope.$on = function() {};
            controller = $controller('SearchCtrl', {$scope: $scope});
        });

        describe('search controller tests', function(){
           it('should call getTypeaheadData', function() {
               spyOn(SearchService, 'getTypeaheadData')
                   .and.returnValue({then: function() {}});

               $scope.getTypeaheadData();

               expect(SearchService.getTypeaheadData).toHaveBeenCalled();
           });

            it('should emit event with teamMembers', function() {
                spyOn($scope, '$emit');
                $scope.teamMembers = [];

                $scope.refreshTeamList();

                expect($scope.$emit).toHaveBeenCalledWith('saveTeamMembers', $scope.teamMembers);
            });

            it('should remove teamMember', function() {
                $scope.teamMembers = [
                    {
                        name: 'Ross Gellar'
                    },
                    {
                        name: 'Chandler Bing'
                    }
                ];

                $scope.removeTeamMember(0);

                expect($scope.teamMembers).toEqual([{name: 'Chandler Bing'}]);
            });

            it('should mock request for staff.json', function() {
                $scope.items = [];
                SearchService = {
                    getTypeaheadData: function() {}
                };

                spyOn($rootScope, '$broadcast').and.callThrough();

                $rootScope.$broadcast('changeActiveTeam');
                $httpBackend.whenGET('staff.json').respond(
                    SearchService.getTypeaheadData());
                $scope.$digest();
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
            });
        });
    });
})();
